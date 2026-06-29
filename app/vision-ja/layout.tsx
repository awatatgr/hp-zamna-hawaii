import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SOLUNA FEST HAWAII 2026 — ビジョン",
  description:
    "日程未定（TBA）、モアナルアガーデン（オアフ島）。ZAMNA×SOLUNA。300機ドローン、バニヤンツリー、野外テクノ。",
  openGraph: {
    title: "SOLUNA FEST HAWAII 2026 — ビジョン",
    description:
      "日程未定（TBA）、モアナルアガーデン（オアフ島）。ZAMNA×SOLUNA。300機ドローン、バニヤンツリー、野外テクノ。",
    url: "https://solun.art/vision-ja",
    type: "website",
    siteName: "SOLUNA",
  },
  twitter: {
    card: "summary_large_image",
    title: "SOLUNA FEST HAWAII 2026 — ビジョン",
    description:
      "日程未定（TBA）、モアナルアガーデン（オアフ島）。ZAMNA×SOLUNA。300機ドローン、バニヤンツリー、野外テクノ。",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
