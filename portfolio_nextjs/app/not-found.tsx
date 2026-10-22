import Link from "next/link";

export default function NotFound() {
  return <main className="site-shell"><section className="hero"><p className="eyebrow">404</p><h1>Not found.</h1><p className="lede"><Link href="/">Return home →</Link></p></section></main>;
}
