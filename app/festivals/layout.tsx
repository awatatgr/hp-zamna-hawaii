import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "フェスティバル | SOLUNA",
  description:
    "SOLUNA FEST HAWAII 2026 — Date TBA, Moanalua Gardens, Oahu.",
  openGraph: {
    title: "フェスティバル | SOLUNA",
    description:
      "SOLUNA FEST HAWAII 2026 — Date TBA, Moanalua Gardens, Oahu.",
    url: "https://solun.art/festivals",
    type: "website",
    siteName: "SOLUNA",
  },
  twitter: {
    card: "summary_large_image",
    title: "フェスティバル | SOLUNA",
    description:
      "SOLUNA FEST HAWAII 2026 — Date TBA, Moanalua Gardens, Oahu.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
