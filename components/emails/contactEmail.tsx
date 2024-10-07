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

interface ContactEmailProps {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const ContactEmail = ({
  name,
  email,
  phone,
  message,
}: ContactEmailProps) => (
  <Html>
    <Head />
    <Preview>Nouveau contact de {name}</Preview>
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
            Nouveau Contact
          </Heading>
          <Section className="p-4 border border-gray-300 rounded mb-4">
            <Text className="text-base">
              <strong>Nom :</strong> {name}
            </Text>
            <Text className="text-base">
              <strong>Email :</strong> {email}
            </Text>
            <Text className="text-base">
              <strong>Téléphone :</strong> {phone}
            </Text>
            <Text className="text-base">
              <strong>Message :</strong>
            </Text>
            <Text className="text-base">{message}</Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default ContactEmail;
