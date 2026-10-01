import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'JIIT Toppers',
    template: '%s | JIIT Toppers',
  },
  description: 'A student-first workspace for JIIT academics, study resources, exams, campus information and career preparation.',
  applicationName: 'JIIT Toppers',
  appleWebApp: { capable: true, title: 'JIIT Toppers', statusBarStyle: 'default' },
  formatDetection: { telephone: false },
  openGraph: {
    type: 'website',
    title: 'JIIT Toppers',
    description: 'A student-first workspace for JIIT.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#f7f4ee',
  colorScheme: 'light',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
