import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/Home'
import StorePage from './pages/Store'
import StoreDetail from './pages/Store/StoreDetail'
import TechnologyPage from './pages/Technology'
import BlogDetail from './pages/Technology/BlogDetail'
import CataloguePage from './pages/Catalogue'
import AboutUsPage from './pages/AboutUs'
import SupportPage from './pages/Support'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          
          {/* Store routes */}
          <Route path="store">
            <Route index element={<StorePage />} />
            <Route path=":category/:id" element={<StoreDetail />} />
          </Route>
          
          {/* Blog routes */}
          <Route path="blog">
            <Route index element={<TechnologyPage />} />
            <Route path=":id" element={<BlogDetail />} />
          </Route>

          {/* Additional pages */}
          <Route path="catalogue" element={<CataloguePage />} />
          <Route path="about-us" element={<AboutUsPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          
          {/* Compatibility routes */}
          <Route path="products/:type/:category/:id" element={<StoreDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
