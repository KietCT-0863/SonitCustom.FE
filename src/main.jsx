import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/Home'
import StorePage from './pages/Store'
import StoreDetail from './pages/Store/StoreDetail'
import BlogPage from './pages/Blog'
import BlogDetail from './pages/Blog/BlogDetail'
import CataloguePage from './pages/Catalogue'
import CatalogueDetail from './pages/Catalogue/CatalogueDetail'
import AboutUsPage from './pages/AboutUs'
import SupportPage from './pages/Support'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import NotFoundPage from './pages/NotFound'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Authentication routes (không sử dụng MainLayout) */}
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        
        {/* 404 Not Found route - Không dùng MainLayout */}
        <Route path="*" element={<NotFoundPage />} />
        
        {/* Main routes với MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          
          {/* Store routes */}
          <Route path="store">
            <Route index element={<StorePage />} />
            <Route path=":id" element={<StoreDetail />} />
            <Route path="billiard/:id" element={<StoreDetail />} />
            <Route path=":category/:id" element={<StoreDetail />} />
          </Route>
          
          {/* Blog routes */}
          <Route path="blog">
            <Route index element={<BlogPage />} />
            <Route path=":id" element={<BlogDetail />} />
          </Route>

          {/* Catalogue routes */}
          <Route path="catalogue">
            <Route index element={<CataloguePage />} />
            <Route path=":id" element={<CatalogueDetail />} />
            <Route path="ring/:id" element={<CatalogueDetail />} />
            <Route path="billiard/:id" element={<CatalogueDetail />} />
          </Route>
          
          {/* Additional pages */}
          <Route path="about-us" element={<AboutUsPage />} />
          <Route path="support" element={<SupportPage />} />
          
          {/* Compatibility routes */}
          <Route path="products/:type/:category/:id" element={<StoreDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
