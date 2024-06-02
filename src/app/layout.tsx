import type { Metadata } from "next";
import { Inter, BIZ_UDPGothic } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Container from "@/components/container";

const biz = BIZ_UDPGothic({
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog to explain web development tech.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${biz.className} font-bold text-black bg-neutral-300 min-h-screen`}>
        <Container>
          <Header />
          {children}
          <Footer />
        </Container>
      </body>
    </html>
  );
}
