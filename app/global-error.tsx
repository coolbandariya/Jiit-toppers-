'use client';

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <main style={{ minHeight: '100vh', display: 'grid', placeContent: 'center', padding: 24, fontFamily: 'system-ui, sans-serif', background: '#f7f4ee', color: '#111' }}>
          <section role="alert" aria-labelledby="global-error-title">
            <p style={{ letterSpacing: '.14em', fontSize: 12, fontWeight: 700 }}>JIIT TOPPERS</p>
            <h1 id="global-error-title">Something went wrong.</h1>
            <p>The application could not recover automatically. Please try again.</p>
            <button type="button" onClick={() => reset()} style={{ padding: '12px 16px', borderRadius: 8, background: '#111', color: '#fff', border: 0, cursor: 'pointer' }}>Try again</button>
          </section>
        </main>
      </body>
    </html>
  );
}
