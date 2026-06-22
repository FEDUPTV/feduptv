import type { Metadata } from "next";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "FEDUP",
  description: "Females Ending Defeat. Unleashing Purpose.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="flex min-h-screen flex-col bg-[#080808] text-[#F4EFE6]">
  <Navbar />

  <main className="flex-1 bg-[#080808]">
    {children}
  </main>

  <Footer />
</body>
    </html>
  );
}
