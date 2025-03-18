import { createRoot } from 'react-dom/client'
import DevicesPage from './pages/DevicesPage'

import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/query'

import './index.css'
import React from 'react'
import { Toaster } from 'sonner'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster />
        <DevicesPage />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)
