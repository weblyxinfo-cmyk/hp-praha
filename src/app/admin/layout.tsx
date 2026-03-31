import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Homeopatie Petra",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
