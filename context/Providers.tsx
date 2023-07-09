'use client'

import { ThemeProvider } from 'next-themes'

type ProviderProps = {
  children: React.ReactNode
}

export default function Providers({ children }: ProviderProps) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>
}
