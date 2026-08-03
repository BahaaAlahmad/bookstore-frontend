import type { ReactNode } from "react";

import { Navbar } from "./Navbar";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({
  children,
}: MainLayoutProps) {
  return (
    <>
      <Navbar />

      <main className="page">
        {children}
      </main>
    </>
  );
}