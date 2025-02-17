import Link from "next/link";
import { hash } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { lucia, validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Form } from "@/lib/form";
import { generateId } from "lucia";
import type { ActionResult } from "@/lib/form";
import prisma from "@/lib/prisma";
import { Input } from "@/components/ui/input";
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
    <div className="flex flex-col w-full justify-center items-center">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Make changes to your account here. Click save when you&apos;re done.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Form action={signup}>
            <Input name="username" id="username" placeholder="username" />
            <br />

            <Input
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
            <br />
            <Button type="submit">Continue</Button>
          </Form>
        </CardContent>
        <CardFooter>
          <Link href="/login">
            <Button type="button" variant={"link"}>
              Sign in
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

async function signup(_: any, formData: FormData): Promise<ActionResult> {
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

  // Hash the password
  const passwordHash = await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  const userId = generateId(15); // Generate user ID
  const sessionToken = generateId(32); // Generate session token
  const sessionId = generateId(15);
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // Session expiration in 7 days

  try {
    // Create the new user
    await prisma.user.create({
      data: {
        id: userId,
        username,
        password_hash: passwordHash,
      },
    });

    // Create a session for the user
    await prisma.session.create({
      data: {
        id: sessionId,
        sessionToken,
        userId,
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
  } catch (e: any) {
    // Handle unique constraint error (username already exists)
    if (e.code === "P2002" && e.meta?.target?.includes("username")) {
      return {
        error: "Username already used",
      };
    }
    return {
      error: "An unknown error occurred",
    };
  }

  return redirect("/");
}
