import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from "@/components/ui/sonner.tsx"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster
      position="top-right"
      closeButton
      richColors
      expand={true}
      duration={2000}
    />
    <App />
  </StrictMode>,
)
