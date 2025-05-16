import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="header">
        <img src="/sonit new.jpg" alt="Exceed Logo" className="logo" />
        <nav className="nav-links">
          <a href="/store">STORE</a>
          <a href="/blog">BLOG</a>
        </nav>
        <div className="language-social">
          <a href="/english">English</a>
          <div className="social-icons">
            <span>FB</span>
            <span>IG</span>
            <span>YT</span>
          </div>
        </div>
      </header>

      <section className="hero-slider">
        <div className="hero-slide" style={{ backgroundImage: 'url(/assets/miyabi.jpg)' }}>
          <div className="hero-content">
            <h1 className="hero-title">MIYABI</h1>
            <h2 className="hero-subtitle">Exceed Special Japan Edition</h2>
          </div>
        </div>
      </section>

      <section className="product-grid">
        <div className="product-item">
          <img src="/assets/exics-13wc2.jpg" alt="EXICS-13WC2" />
          <div className="product-overlay">
            <h2 className="product-name">EXICS-13WC2</h2>
          </div>
        </div>
        <div className="product-item">
          <img src="/assets/koukai.jpg" alt="KOUKAI" />
          <div className="product-overlay">
            <h2 className="product-name">KOUKAI</h2>
          </div>
        </div>
        <div className="product-item">
          <img src="/assets/santa-fe.jpg" alt="Santa Fe Collection" />
          <div className="product-overlay">
            <h2 className="product-name">Santa Fe Collection</h2>
          </div>
        </div>
        <div className="product-item">
          <img src="/assets/exics-09sf.jpg" alt="EXICS-09SF" />
          <div className="product-overlay">
            <h2 className="product-name">EXICS-09SF</h2>
          </div>
        </div>
      </section>

      <section className="technology-section">
        <div className="tech-item">
          <img src="/assets/cue-factory.jpg" alt="Factory" />
          <h3 className="tech-title">AVAILABLE CUE AT FACTORY</h3>
        </div>
        <div className="tech-item">
          <img src="/assets/shaft-tech.jpg" alt="Shaft Technology" />
          <h3 className="tech-title">EX PRO SHAFT TECHNOLOGY</h3>
        </div>
        <div className="tech-item">
          <img src="/assets/butt-tech.jpg" alt="Butt Technology" />
          <h3 className="tech-title">EXCEED BUTT TECHNOLOGY</h3>
        </div>
        <div className="tech-item">
          <img src="/assets/find-dealer.jpg" alt="Find a Dealer" />
          <h3 className="tech-title">FIND A DEALER</h3>
        </div>
      </section>

      <footer className="footer">
        <div className="social-links">
          <a href="https://facebook.com">FB</a>
          <a href="https://instagram.com">IG</a>
          <a href="https://youtube.com">YT</a>
          <a href="https://twitter.com">TW</a>
          <a href="https://tiktok.com">TT</a>
        </div>
        <img src="/logo.png" alt="Exceed Logo" className="logo" />
        <p>BORN TO PERFORM</p>
        <p className="copyright">Copyright EXCEED CO., LTD. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
