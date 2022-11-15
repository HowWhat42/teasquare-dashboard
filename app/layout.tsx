/* eslint-disable @next/next/no-head-element */
import Link from 'next/link';
import './global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head></head>
      <body>
        <main>
          <nav>
            <Link href="/">
              Home
            </Link>
            <Link href="/accounts">
              Accounts
            </Link>
            <Link href="/traders">
              Traders
            </Link>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
