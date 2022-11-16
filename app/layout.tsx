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
          <h1 className="font-space font-semibold text-6xl text-white text-center my-12">TeaSquare Dashboard</h1>
          {/* <div className='w-60 h-60 bg-black blur-3xl absolute' /> */}
          {children}
        </main>
      </body>
    </html>
  );
}
