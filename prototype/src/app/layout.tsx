import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Recordare (레코다레) — 당신의 삶, 단 하나의 기억으로",
  description:
    "지적장애인 자립을 위한 생애주기별 기록 + 권한 매칭 플랫폼 · 38화면 프로토타입",
  themeColor: "#2D6A4F",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-cream text-ink antialiased">{children}</body>
    </html>
  );
}
