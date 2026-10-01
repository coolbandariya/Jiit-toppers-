import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="jt-container jt-error">
      <p className="jt-kicker">404 · PAGE NOT FOUND</p>
      <h1>We couldn’t find that page.</h1>
      <p className="jt-lead">The link may be outdated, or the page may have moved.</p>
      <Link className="jt-primary jt-link-button" href="/">Back to home</Link>
    </main>
  );
}
