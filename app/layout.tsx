import type { Metadata } from "next";

import "./globals.css";
import { Providers } from "./providers";
import PersistentDrawer from "@/components/Drawer/CustomDrawer";

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
        <Providers>
          <PersistentDrawer></PersistentDrawer>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
