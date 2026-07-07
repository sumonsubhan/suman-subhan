import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://sumansubhan.com"),

  title: {
    default: "সুমন শুভান | বাংলা বই, গান, কবিতা ও সংস্কৃতি",
    template: "%s | সুমন শুভান",
  },

  description:
    "বাংলা বই, গান, কবিতা, সাহিত্য, সাংস্কৃতিক অনুষ্ঠান এবং শিক্ষামূলক বিষয়বস্তুর একটি সমৃদ্ধ সংগ্রহ।",

  keywords: [
    "সুমন শুভান",
    "বাংলা বই",
    "বাংলা সাহিত্য",
    "বাংলা গান",
    "বাংলা কবিতা",
    "Bangla books",
    "Bengali books",
    "Bangla literature",
    "Bengali literature",
    "Bangla songs",
    "Bangla poems",
  ],

  applicationName: "সুমন শুভান",

  authors: [
    {
      name: "Suman Subhan",
      url: "https://sumansubhan.com",
    },
  ],

  creator: "Suman Subhan",

  publisher: "Suman Subhan",

  category: "Education",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "bn_BD",
    siteName: "সুমন শুভান",
    title: "সুমন শুভান | বাংলা বই, গান, কবিতা ও সংস্কৃতি",
    description:
      "বাংলা বই, গান, কবিতা, সাহিত্য, সাংস্কৃতিক অনুষ্ঠান এবং শিক্ষামূলক বিষয়বস্তুর একটি সমৃদ্ধ সংগ্রহ।",
    url: "https://sumansubhan.com",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "সুমন শুভান",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "সুমন শুভান | বাংলা বই, গান, কবিতা ও সংস্কৃতি",
    description:
      "বাংলা বই, গান, কবিতা, সাহিত্য, সাংস্কৃতিক অনুষ্ঠান এবং শিক্ষামূলক বিষয়বস্তুর একটি সমৃদ্ধ সংগ্রহ।",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn-BD" data-theme="light">
      <body>{children}</body>
    </html>
  );
}