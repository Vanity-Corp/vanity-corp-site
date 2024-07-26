"use client";
import { TextGenerateEffect } from "./ui/text-generate-effect";

export function GeneratedText(props: any) {
  const words = props.text;
  return <TextGenerateEffect className={props.className} words={words} />;
}
