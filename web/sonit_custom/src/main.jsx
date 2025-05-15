import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/Home'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  </StrictMode>,
)
