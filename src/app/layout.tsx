import './globals.css'
import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display, DM_Mono, Noto_Sans_Devanagari } from 'next/font/google'

const dmSans = DM_Sans({ 
  subsets: ['latin'], 
  variable: '--font-body',
  weight: ['300', '400', '500', '600'],
  display: 'swap'
})

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-display',
  display: 'swap'
})

const dmMono = DM_Mono({ 
  subsets: ['latin'], 
  variable: '--font-mono',
  weight: ['300', '400', '500'],
  display: 'swap'
})

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-hindi',
  weight: ['400', '500', '600'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'CC·AI — College Circle AI',
  description: 'Learning, Redefined. AI-powered personalised education platform built for students, by students.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable} ${dmMono.variable} ${notoDevanagari.variable}`}>
      <body className={dmSans.className}>{children}</body>
    </html>
  )
}
