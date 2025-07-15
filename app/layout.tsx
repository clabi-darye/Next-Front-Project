import type { Metadata } from "next";

import { Providers } from "./providers";
import { MSWComponent } from "./MSWComponent";

import PersistentDrawer from "@/components/Drawer/CustomDrawer";
import AppInitializer from "@/components/AppInitializer";

import "./globals.css";

export const metadata: Metadata = {
  title: "Chat Bot Template",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <body>
        <MSWComponent>
          <Providers>
            <AppInitializer />
            <PersistentDrawer></PersistentDrawer>
            <main>{children}</main>
          </Providers>
        </MSWComponent>
      </body>
    </html>
  );
};

export default RootLayout;
