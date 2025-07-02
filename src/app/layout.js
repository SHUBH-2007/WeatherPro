import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata = {
  title: "Weather Pro",
  description: "Track real-time weather and forecast with a beautiful UI.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          font-sans 
          bg-gradient-to-b from-cyan-700 to-blue-900 
          text-white 
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}
