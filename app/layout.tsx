"use client"
/* eslint-disable @next/next/no-head-element */
import Link from 'next/link';
import '../styles/dist.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head></head>
      <body className='bg-main bg-cover backdrop-blur-lg h-full'>
        <main className='m-16 bg-slate-600 bg-opacity-75 rounded-2xl'>
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
