import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Computer Engineering Student Portal",
  description: "Comprehensive student management system for Computer Engineering Department. Access academic records, fees payment, course enrollments, and lecturer assignments.",
  keywords: "student portal, academic management, computer engineering, university dashboard, fees payment, course enrollment",
  authors: [{ name: "Computer Engineering Department" }],
  creator: "Computer Engineering Department",
  publisher: "Computer Engineering Department",
  robots: "index, follow",
  openGraph: {
    title: "Computer Engineering Student Portal",
    description: "Comprehensive student management system for academic excellence",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Computer Engineering Student Portal",
    description: "Comprehensive student management system for academic excellence",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#0f766e", // teal-700
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
