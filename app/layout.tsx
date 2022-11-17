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
