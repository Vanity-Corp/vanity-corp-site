import Link from "next/link";

import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { lucia, validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Form } from "@/lib/form";
import type { ActionResult } from "@/lib/form";
import prisma from "@/lib/prisma";
import { generateId } from "lucia";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import Image from "next/image";

const signupSchema = z.object({
  username: z
    .string()
    .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères")
    .max(31, "Le nom d'utilisateur doit contenir au maximum 31 caractères")
    .regex(
      /^[a-z0-9_-]+$/,
      "Le nom d'utilisateur ne peut contenir que des lettres, des chiffres, des tirets (-) et des underscores (_)"
    ),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .max(255, "Le mot de passe doit contenir au maximum 255 caractères"),
});
export default async function Page() {
  const { user } = await validateRequest();
  if (user) {
    return redirect("/");
  }
  return (
    <div className="flex flex-row w-full h-screen justify-around items-center">
      <Card className="max-w-xl">
        <CardHeader>
          <Image
            className="my-0 mx-auto"
            width="100"
            height="100"
            src="https://firebasestorage.googleapis.com/v0/b/pokemoh-ad0fa.appspot.com/o/vanity_corp_Icon_color.png?alt=media&token=d032c028-f706-44e7-9ce7-344be758e94d"
            alt=""
          />
          <CardTitle className="text-2xl font-bold md:text-4xl text-center">
            Bienvenue !
          </CardTitle>
          <CardDescription className="mt-4">
            Connecte-toi pour accéder à ton espace personnel et commencer à
            collaborer.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Form action={login}>
            <Input
              name="username"
              id="username"
              placeholder="Nom d'utilisateur"
              className="rounded-t-lg"
            />
            <br />

            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Mot de passe"
              className="rounded-t-lg"
            />
            <br />
            <Button>Continue</Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

async function login(_: any, formData: FormData): Promise<ActionResult> {
  "use server";
  // Convert formData into a plain object
  const data = Object.fromEntries(formData.entries());

  // Validate the form data
  const parsedData = signupSchema.safeParse(data);

  if (!parsedData.success) {
    // Extract and return validation errors
    const errorMessages = parsedData.error.errors.map((err) => err.message);
    return { error: errorMessages.join(", ") };
  }

  const { username, password } = parsedData.data;

  // Find user in the database
  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (!existingUser) {
    return {
      error: "Nom d'utilisateur incorrect",
    };
  }

  // Verify the password
  const validPassword = await verify(existingUser.password_hash, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  if (!validPassword) {
    return {
      error: "Mot de passe incorrect",
    };
  }

  // Create session token and expiration date
  const sessionToken = generateId(32); // Use your preferred token generator
  const sessionId = generateId(15);
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // Session expiration in 7 days

  // Store the session in the database
  await prisma.session.create({
    data: {
      id: sessionId,
      sessionToken,
      userId: existingUser.id,
      expires: expiresAt,
    },
  });

  // Set session cookie
  cookies().set("sessionToken", sessionToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
    path: "/",
  });

  return redirect("/dashboard");
}
