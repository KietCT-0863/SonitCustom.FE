import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/Home'
import CuesPage from './pages/Cues'
import ShaftsPage from './pages/Shafts'
import AccessoriesPage from './pages/Accessories'
import CasesPage from './pages/Cases'
import CueDetail from './pages/Cues/CueDetail'
import ShaftDetail from './pages/Shafts/ShaftDetail'
import AccessoryDetail from './pages/Accessories/AccessoryDetail'
import CaseDetail from './pages/Cases/CaseDetail'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          
          <Route path="cues">
            <Route index element={<CuesPage />} />
            <Route path=":category" element={<CuesPage />} />
          </Route>
          
          <Route path="shafts">
            <Route index element={<ShaftsPage />} />
            <Route path=":category" element={<ShaftsPage />} />
          </Route>
          
          <Route path="products">
            <Route path="cues/:category/:id" element={<CueDetail />} />
            <Route path="shafts/:category/:id" element={<ShaftDetail />} />
            <Route path="accessories/:category/:id" element={<AccessoryDetail />} />
            <Route path="cases/:category/:id" element={<CaseDetail />} />
          </Route>
          
          <Route path="accessories">
            <Route index element={<AccessoriesPage />} />
            <Route path=":category" element={<AccessoriesPage />} />
          </Route>
          
          <Route path="cases">
            <Route index element={<CasesPage />} />
            <Route path=":category" element={<CasesPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
