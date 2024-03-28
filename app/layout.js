import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigationbar/Navigation";
import { SessionProvider } from "next-auth/react"
import NextAuthProvider from "@/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Navigation />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
