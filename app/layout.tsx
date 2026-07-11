import type { Metadata } from "next";
import { Fraunces, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Display serif — carries the emotional, cinematic weight of the name.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

// Grotesk — the technical counterweight for taglines and body copy.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

// Mono — for labels, eyebrows, and system-feeling captions.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ankit Kumar — AI/ML Software Engineer",
  description:
    "Ankit Kumar builds LLM pipelines, RAG systems, and full-stack AI products — turning unstructured audio and language into structured, searchable intelligence.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
