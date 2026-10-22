"use client";

export default function Error({ reset }: { reset: () => void }) {
  return <main className="site-shell"><section className="hero"><p className="eyebrow">Something went wrong</p><h1>Try again.</h1><p className="lede"><button onClick={reset}>Reload this page</button></p></section></main>;
}
