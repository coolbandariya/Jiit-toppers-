import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'JIIT Toppers',
  description: 'Your JIIT, in one place — academics, resources, exams, campus and placements.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
