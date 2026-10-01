'use client';

import { useEffect } from 'react';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Keep the error boundary intentionally quiet; do not expose internal details.
  }, []);

  return (
    <main className="jt-container jt-error" role="alert">
      <p className="jt-kicker">JIIT TOPPERS</p>
      <h1>Something went wrong.</h1>
      <p className="jt-lead">The page could not be loaded. Please try again.</p>
      <button className="jt-primary" onClick={() => reset()}>Try again</button>
    </main>
  );
}
