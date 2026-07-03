/* eslint-disable @next/next/no-img-element */
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

interface ReservationEmailProps {
  fullName: string;
  email: string;
  phone: string;
  clientType: string;
  projectDescription: string;
  date: string; // formatted date string
  hours: string; // comma-separated hours
}

export const ReservationEmail = ({
  fullName,
  email,
  phone,
  clientType,
  projectDescription,
  date,
  hours,
}: ReservationEmailProps) => (
  <Html>
    <Head />
    <Preview>Nouvelle réservation studio - {fullName}</Preview>
    <Tailwind>
      <Body className="bg-gray-100 p-6">
        <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
          <Section className="mt-[32px]">
            <img
              width={1000}
              height={1000}
              src="https://firebasestorage.googleapis.com/v0/b/pokemoh-ad0fa.appspot.com/o/vanity_corp_Icon_color.png?alt=media&token=d032c028-f706-44e7-9ce7-344be758e94d"
              alt="Vanity Corp"
              className="my-0 mx-auto"
            />
          </Section>
          <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
            Nouvelle demande de réservation
          </Heading>
          <Section className="p-4 border border-gray-300 rounded mb-4">
            <Text className="text-base">
              <strong>Nom :</strong> {fullName}
            </Text>
            <Text className="text-base">
              <strong>Email :</strong> {email}
            </Text>
            <Text className="text-base">
              <strong>Téléphone :</strong> {phone}
            </Text>
            <Text className="text-base">
              <strong>Type de client :</strong>{" "}
              {clientType === "particulier"
                ? "Particulier"
                : "Société / Professionnel"}
            </Text>
            <Text className="text-base">
              <strong>Date choisie :</strong> {date}
            </Text>
            <Text className="text-base">
              <strong>Créneaux horaires :</strong> {hours}
            </Text>
            <Text className="text-base">
              <strong>Description du projet :</strong>
            </Text>
            <Text className="text-base">{projectDescription}</Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default ReservationEmail;
