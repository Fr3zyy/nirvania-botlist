import { Lexend, Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/auth";
import Header from "@/components/Header";
import config from "../../config";
import { Toaster } from "sonner";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata = {
  title: config.siteConfig.name,
  description: config.siteConfig.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lexend.className}>
        <Toaster toastOptions={{
          className: "bg-gray-900/20 text-white border border-white/5"
        }} />
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
