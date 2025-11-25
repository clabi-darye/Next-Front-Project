import type { Metadata, Viewport } from "next";

import { Providers } from "./providers";

import AppInitializer from "@/components/AppInitializer";
import { GlobalAlert } from "@/components/common/GlobalAlert";
import ThemeProviderClient from "@/components/ThemeProviderClient";

import "./globals.css";

export const metadata: Metadata = {
  title: "Next Front Project",
  description: "Next Front Project",
  keywords: ["Next", "Front", "Project"],
  publisher: "Next Front Project",
  openGraph: {
    title: "Next Front Project",
    description: "Next Front Project",
    url: "https://next-front-project.com/",
    siteName: "Next Front Project",
    locale: "ko_KR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <AppInitializer projectinfo={null} />
          <ThemeProviderClient>
            <GlobalAlert />
            {children}
          </ThemeProviderClient>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
