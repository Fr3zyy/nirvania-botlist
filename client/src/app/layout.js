import { Lexend, Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/auth";
import Header from "@/components/Header";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata = {
  title: "Nirvania Botlist #SOON",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lexend.className}>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>

      </body>
    </html>
  );
}