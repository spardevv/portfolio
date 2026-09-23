import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "next-themes";
import { LocaleProvider } from "@/lib/locale-context";
import { PageLoader } from "@/components/page-loader";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-outfit",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.spardevv.com"),
  title: {
    default: "Spardevv | Desenvolvedor Full Stack",
    template: "%s | Spardevv",
  },
  description:
    "Portfólio de Gabriel Fernandes Ramos, desenvolvedor Full Stack especializado em C#, .NET, Kotlin, React.js, Vue.js, SQL e Entity Framework. Desenvolvimento de aplicações web e mobile para projetos freelance.",
  keywords: [
    "Gabriel Fernandes Ramos",
    "Spardevv",
    "desenvolvedor full stack",
    "C#",
    ".NET",
    "Kotlin",
    "React.js",
    "Vue.js",
    "SQL",
    "Entity Framework",
    "freelancer",
  ],
  authors: [
    {
      name: "Gabriel Fernandes Ramos",
      url: "https://www.spardevv.com",
    },
  ],
  creator: "Gabriel Fernandes Ramos",
  publisher: "Spardevv",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.spardevv.com",
    siteName: "Spardevv",
    title: "Spardevv | Desenvolvedor Full Stack",
    description:
      "Portfólio de Gabriel Fernandes Ramos, desenvolvedor Full Stack especializado em C#, .NET, Kotlin, React.js, Vue.js, SQL e Entity Framework.",
    images: [
      {
        url: "/favicon.png",
        alt: "Favicon do projeto Spardevv",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Spardevv | Desenvolvedor Full Stack",
    description:
      "Portfólio de Gabriel Fernandes Ramos, desenvolvedor Full Stack e freelancer.",
    images: ["/favicon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://www.spardevv.com/#person",
  name: "Gabriel Fernandes Ramos",
  alternateName: "Spardevv",
  url: "https://www.spardevv.com/",
  image: "https://www.spardevv.com/images/profile.jpg",
  jobTitle: "Desenvolvedor Full Stack",
  description:
    "Desenvolvedor Full Stack e freelancer especializado em C#, .NET, Kotlin, React.js, Vue.js, SQL e Entity Framework.",
  knowsLanguage: ["pt-BR", "en-US"],
  knowsAbout: [
    "C#",
    ".NET",
    "Kotlin",
    "React.js",
    "Vue.js",
    "SQL",
    "Entity Framework",
  ],
  sameAs: [
    "https://github.com/spardevv",
    "https://linkedin.com/in/spardevv",
  ],
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f8f8" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a2e" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${dmSans.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LocaleProvider>
            <PageLoader>{children}</PageLoader>
          </LocaleProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
