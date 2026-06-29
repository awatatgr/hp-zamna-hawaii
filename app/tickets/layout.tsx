import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "チケット | SOLUNA FEST HAWAII 2026",
  description:
    "GA・VIP・バックステージパス。日程未定（TBA）、オアフ島モアナルアガーデン。",
  openGraph: {
    title: "チケット | SOLUNA FEST HAWAII 2026",
    description:
      "GA・VIP・バックステージパス。日程未定（TBA）、オアフ島モアナルアガーデン。",
    url: "https://solun.art/tickets",
    type: "website",
    siteName: "SOLUNA",
  },
  twitter: {
    card: "summary_large_image",
    title: "チケット | SOLUNA FEST HAWAII 2026",
    description:
      "GA・VIP・バックステージパス。日程未定（TBA）、オアフ島モアナルアガーデン。",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
