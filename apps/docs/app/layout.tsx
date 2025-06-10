import type { Metadata } from "next";
import { PrefetchCrossZoneLinks } from "@mf/components/prefetch";
import { Layout } from "@vercel/examples-ui";
import "@vercel/examples-ui/globals.css";

export const metadata: Metadata = {
  title: "Microfrontends",
  description: "Example demonstrating vertical microfrontends on Vercel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <Layout title="Microfrontends Docs App" path="solutions/microfrontends">
          {children}
        </Layout>
        <PrefetchCrossZoneLinks hrefs={["/", "/about"]} />
      </body>
    </html>
  );
}
