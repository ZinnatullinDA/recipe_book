import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from '@/app/providers/router'
import '@/app/styles/globals.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
)
