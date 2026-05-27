import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '株式会社BMS | Coming Soon',
  description:
    '株式会社BMSの新しいサービスを開発中です。公開前の先行アクセス登録を受付しています。',
  openGraph: {
    title: '株式会社BMS | Coming Soon',
    description:
      '株式会社BMSの新しいサービスを開発中です。公開前の先行アクセス登録を受付しています。',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
