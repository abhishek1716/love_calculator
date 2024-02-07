import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

const satisfyFont = localFont({
  src: "../../public/satisfy.ttf",
  variable: "--font-satisfy",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Love Calculator",
  description: "Love Calculator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${satisfyFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
