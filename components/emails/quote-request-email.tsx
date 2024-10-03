import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Img,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";
import Image from "next/image";
interface QuoteRequestEmailProps {
  clientType: string;
  budget: string;
  services: string;
  features: string;
  name: string;
  email: string;
  phone: string;
}

export const QuoteRequestEmail = ({
  clientType,
  budget,
  services,
  features,
  name,
  email,
  phone,
}: QuoteRequestEmailProps) => (
  <Html>
    <Head />
    <Preview>Nouvelle demande de devis de {name}</Preview>
    <Tailwind>
      <Body className="bg-gray-100 p-6">
        <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
          <Section className="mt-[32px]">
            <Img
              src="https://firebasestorage.googleapis.com/v0/b/pokemoh-ad0fa.appspot.com/o/vanity_corp_Icon_color.png?alt=media&token=d032c028-f706-44e7-9ce7-344be758e94d"
              alt="Cat"
              width="100"
              height="100"
              className="my-0 mx-auto"
            />
          </Section>
          <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
            Nouvelle demande de devis
          </Heading>

          <Text className="text-base mb-4">
            Vous avez reçu une nouvelle demande de devis de{" "}
            <strong>{name}</strong>. Voici les détails :
          </Text>

          <Section className="p-4 border border-gray-300 rounded mb-4">
            <Text className="text-base">
              <strong>1. Qui êtes-vous ?</strong> {clientType}
            </Text>
            <Text className="text-base">
              <strong>2. Qu’est-ce qu’on peut faire pour vous ?</strong>{" "}
              {services}
            </Text>
            <Text className="text-base">
              <strong>3. Racontez-nous votre projet en quelques mots...</strong>{" "}
              {features}
            </Text>
            <Text className="text-base">
              <strong>4. Quel est votre budget ?</strong> {budget}
            </Text>
            <Text className="text-base">
              <strong>5. Comment vous contacter ?</strong> Email : {email},
              Téléphone : {phone}
            </Text>
          </Section>

          <Hr className="border-gray-400 my-4" />
          <Text className="text-gray-600 text-xs">
            Cet email a été envoyé depuis votre application d&apos;estimation de
            devis.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default QuoteRequestEmail;
