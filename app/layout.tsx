import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rawbify - Raw Data In. BI Ready Out.",
  description: "Transform messy business data into clean, analysis-ready datasets for Power BI and Tableau in minutes, not hours.",
  keywords: ["data cleaning", "business intelligence", "Power BI", "Tableau", "data processing", "AI", "data transformation"],
  authors: [{ name: "Rawbify Team" }],
  creator: "Rawbify",
  publisher: "Rawbify",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://rawbify.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/rawbify_logo.svg',
    shortcut: '/rawbify_logo.svg',
    apple: '/rawbify_logo.svg',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: "Rawbify - Raw Data In. BI Ready Out.",
    description: "Transform messy business data into clean, analysis-ready datasets for Power BI and Tableau in minutes, not hours.",
    url: 'https://rawbify.com',
    siteName: 'Rawbify',
    type: "website",
    locale: 'en_US',
    images: [
      {
        url: '/rawbify_logo.svg',
        width: 1200,
        height: 630,
        alt: 'Rawbify Logo',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rawbify - Raw Data In. BI Ready Out.",
    description: "Transform messy business data into clean, analysis-ready datasets for Power BI and Tableau in minutes, not hours.",
    images: ['/rawbify_logo.svg'],
    creator: '@rawbify',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        <link rel="icon" href="/rawbify_logo.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
