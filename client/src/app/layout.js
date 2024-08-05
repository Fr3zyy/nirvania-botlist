import { Lexend, Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/auth";
import Header from "@/components/Header";
import config from "../../config";
import Footer from "@/components/Footer";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata = {
  title: config.siteConfig.name,
  description: config.siteConfig.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lexend.className}>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>

      </body>
    </html>
  );
}
