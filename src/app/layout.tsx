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
      <body className="min-h-screen bg-[#f6f0e6] text-[#17130e] flex flex-col">
  <Navbar />

  <main className="flex-1 bg-[#f6f0e6]">
    {children}
  </main>

  <Footer />
</body>
    </html>
  );
}
