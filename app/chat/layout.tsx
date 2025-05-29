"use client";

import AiDisclaimer from "@/components/AiDisclaimer";

const HomeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col h-full p-[1rem]">
      <section className="flex-1 overflow-auto">{children}</section>
      <AiDisclaimer className="m-auto mt-2" />
    </div>
  );
};

export default HomeLayout;
