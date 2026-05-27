import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Recordare Brand
        primary: { DEFAULT: "#2D6A4F", dark: "#1B4D37", light: "#5A9A7C" },
        secondary: "#F5F0E8",
        accent: "#E07A5F",
        alert: "#F2A93B",
        ink: { DEFAULT: "#2D2D2D", mid: "#555555" },
        cream: "#FAF7F2",
        border: "#DDD5C8",
        // Lifecycle — 7단계 (UX v1.5 §0.1 + Plan v1.6 §2.0.1)
        life: {
          infant:          "#FFB49A",  // 영아기 0~2세
          "early-childhood": "#FFC857", // 영유아기 3~6세
          school:          "#5CB85C",  // 학령기 7~18세
          transition:      "#3B82F6",  // 전환기 15~24세
          adult:           "#7C3AED",  // 성인기 25~64세
          senior:          "#6B7280",  // 고령기 65세+
          "post-care":     "#8FAF8E",  // 사후지원기
        },
      },
      fontFamily: {
        sans: [
          "'Pretendard'",
          "'Malgun Gothic'",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      fontSize: {
        // Accessibility size scale
        "a-sm": "14px",
        "a-md": "16px",
        "a-lg": "20px",
        "a-xl": "24px",
      },
      maxWidth: { content: "1280px" },
    },
  },
  plugins: [],
} satisfies Config;
