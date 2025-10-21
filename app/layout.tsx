import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meta Gameshows",
  description: "Live trivia game show experience",
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: "Meta Gameshows",
    description: "Live trivia game show experience",
    url: "https://gameshows.vercel.app",
    siteName: "Meta Gameshows",
    images: [
      {
        url: "/OGsocialCard.jpg",
        width: 1200,
        height: 630,
        alt: "Meta Gameshows - Live trivia experience",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meta Gameshows",
    description: "Live trivia game show experience",
    images: ["/OGsocialCard.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  );
}
