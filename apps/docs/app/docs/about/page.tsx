import { Page, Text, Code, Link } from "@vercel/examples-ui";
import { Navbar } from "@mf/components/navbar";

export default function AboutPage() {
  return (
    <Page>
      <Navbar isDocsApp />
      <Text variant="h1" className="mb-6">
        About Docs Page
      </Text>
      <Text className="mb-4" variant="smallText">
        This is the about page in the docs app (
        <Code>apps/docs/app/docs/about/page.tsx</Code>).
      </Text>
      <Text>
        Navigationss between <Link href="/docs">Docs</Link> and{" "}
        <Link href="/docs/about">About Docs</Link> are client-side transitions
        because they&apos;re part of the same Next.js app. Navigating to{" "}
        <a
          className="text-link hover:text-link-light transition-colors"
          href="/"
        >
          Home (Multi-Zones)
        </a>{" "}
        requires a page refresh because it lives in a different Next.js app.
      </Text>
    </Page>
  );
}
