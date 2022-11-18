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
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>TeaSquare - Dashboard</title>
      </head>
      <body className='bg-main bg-cover backdrop-blur-lg h-full'>
        <main>
          <Link href='/'>
            <h1 className="font-space font-semibold text-6xl text-white text-center my-12">TeaSquare Dashboard</h1>
          </Link>
          {children}
        </main>
      </body>
    </html>
  );
}
