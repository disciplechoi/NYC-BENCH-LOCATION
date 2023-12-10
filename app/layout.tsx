import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import {Navbar} from '@/components'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NYC Bench Location',
  description: 'NYC Bench Location Near Me',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="city-map">
        <div className="city-map_content">
          <Navbar />
          {children}
        </div>
       
      </body>
       
       

      
    </html>
  )
}
