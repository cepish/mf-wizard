import { Link, A } from '@vercel/examples-ui'

export function Navbar({ isDocsApp }: { isDocsApp?: boolean }) {
  return isDocsApp ? (
    <ul className="inline-flex mb-4">
      <li>
        <A href="/">Page: Home (Multi-Zones)</A>
      </li>
      <li className="ml-4">
        <Link href="/docs">Page: Docs</Link>
      </li>
      <li className="ml-4">
        <Link href="/docs/about">Page: About Docs</Link>
      </li>
    </ul>
  ) : (
    <ul className="inline-flex mb-4">
      <li>
        <Link href="/">Page: Home</Link>
      </li>
      <li className="ml-4">
        <Link href="/about">Page: About</Link>
      </li>
      <li className="ml-4">
        <A href="/docs">Page: Docs (Multi-Zones)</A>
      </li>
    </ul>
  )
}
