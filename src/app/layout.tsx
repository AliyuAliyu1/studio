import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Inter } from 'next/font/google';

export const metadata: Metadata = {
  title: 'ContentSpark',
  description: 'Turn Customer Feedback into Instant, Branded Content',
};

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} light`}>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
