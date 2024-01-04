import { Toaster } from '@/components/ui/Toaster'
import Providers from '@/context/Providers'
import { cn } from '@/utils/buttonUtils'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { Plus_Jakarta_Sans } from 'next/font/google'
import '@/styles/globals.css'

// const Font = LocalFont({
//   src: '../public/fonts/EudoxusSansGX.woff2',
//   display: 'swap',
//   adjustFontFallback: 'Arial',
//   fallback: ['system-ui', 'sans-serif'],
// })

const Font = Plus_Jakarta_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title:
    'Prismify - Create Beautiful Screenshots & Graphics for Websites & Social Media',
  description:
    'Easily make your SaaS/product shots and graphics design stand out. Create beautiful screenshots and graphics for websites, social media, and more. With Prismify, you get browser frames, gradient backgrounds, text, annotations.',
  verification: {
    google: 'cum1ckoCozAtSA3Xcn4UX_xR_FlfrlzKzQRa7nYQ2YM',
  },
  icons: {
    icon: '/favicons/favicon.ico',
    apple: '/favicons/apple-touch-icon.png',
  },
  applicationName: 'Prismify',
  creator: 'Slson',
  twitter: {
    creator: '@xSls0n_007',
    title:
      'Prismify - Effortlessly Create Beautiful SaaS/Product Shots & Graphics',
    description:
      'Easily make your SaaS/product shots & design stand out. Create beautiful screenshots and graphics for websites, social media, and more. With Prismify, you get browser frames, gradient backgrounds, text, annotations.',
    card: 'summary_large_image',
    images: [
      {
        url: 'https://prismify.vercel.app/twitter-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Prismify - Effortlessly Create Beautiful SaaS/Product Shots & Graphics',
      },
    ],
  },
  openGraph: {
    title:
    'Prismify - Create Beautiful Screenshots & Graphics for Websites & Social Media',
    description:
      'Easily make your SaaS/product shots & design stand out. Create beautiful screenshots and graphics for websites, social media, and more. With Prismify, you get browser frames, gradient backgrounds, text, annotations.',
    siteName: 'Prismify',
    url: 'https://prismify.vercel.app',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://prismify.vercel.app/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Prismify - Effortlessly Create Beautiful SaaS/Product Shots & Graphics',
      },
    ],
  },
  colorScheme: 'dark',
  category: 'Design',
  themeColor: '#151515',
  alternates: {
    canonical: 'https://prismify.vercel.app',
  },
  keywords: [
    'SaaS product design',
    'Create beautiful screenshots',
    'Graphics design for social media',
    'Add browser frames',
    'Gradient backgrounds for graphics',
    'Text annotations tool',
    'Beautiful website graphics',
    'Enhance social media visuals',
    'Website demo image creator',
    'Visual content enhancement',
    'SaaS branding tool',
    'Design beautiful image for products',
    'Prismify graphics maker',
    'SaaS graphics design',
    'Website screenshot generator',
    'SaaS marketing visuals',
  ],
  metadataBase: new URL('https://prismify.vercel.app'),
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      suppressHydrationWarning
      className={cn('antialiased', Font.className)}
      lang="en"
    >
      <body className="h-screen w-screen bg-primary text-primary dark:bg-[#111] dark:text-dark ">
        <Toaster />
        <Analytics />

        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
