import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import "./HeaderContent.scss"

const HeaderContent = ({ isDarkMode }) => {
  const navigate = useNavigate()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])



  return (
    <section className={`hero ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="hero-background">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>

      <AnimatePresence mode="wait">
        {isSearchOpen && (
          <motion.div
            className="search-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="search-container">
              <input type="text" placeholder="Tìm kiếm sản phẩm..." autoFocus className="search-input" />
              <button className="close-search" onClick={() => setIsSearchOpen(false)}>
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hero-content">
        <div className="hero-main-content">
          <motion.div
            className="hero-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>SONIT CUSTOM</h1>
            <p>Discover the best billiard collection with exclusive designs and superior quality</p>

            <div className="current-time">{currentTime.toLocaleTimeString()}</div>

            <div className="hero-buttons">
              <motion.button 
                className="btn btn-primary" 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                onClick={() => navigate("/store")}
              >
                SHOP NOW
              </motion.button>
              <motion.button 
                className="btn btn-outline" 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/catalogue")}
              >
                VIEW CATALOGUE
              </motion.button>
            </div>

          </motion.div>

          <motion.div
            className="hero-image-frame"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="image-container">
              <img 
                src="/assets/images/logo.jpg" 
                alt="Premium Billiard Cue" 
                className="main-featured-image" 
              />
              <div className="image-overlay">
                <h3>PREMIUM COLLECTION</h3>
                <p>Handcrafted with precision and elegance</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <ChevronDown size={30} />
        </motion.div>
      </div>


    </section>
  )
}

export default HeaderContent 