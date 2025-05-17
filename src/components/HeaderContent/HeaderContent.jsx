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

  const features = [
    {
      title: "PREMIUM CUES",
      description: "Bộ sưu tập cue độc quyền từ các thương hiệu hàng đầu thế giới với công nghệ tiên tiến",
      direction: "left",
      color: "rgba(212, 201, 190, 0.1)",
    },
    {
      title: "BILLIARD ACCESSORIES",
      description: "Phụ kiện chơi billiard cao cấp, đa dạng từ chalk, găng tay đến các phụ kiện chuyên nghiệp",
      direction: "right",
      color: "rgba(212, 201, 190, 0.1)",
    },
    {
      title: "PROFESSIONAL TABLES",
      description: "Bàn billiard tiêu chuẩn quốc tế, chất lượng vượt trội, độ chính xác tuyệt đối",
      direction: "left",
      color: "rgba(212, 201, 190, 0.1)",
    },
    {
      title: "CUSTOM DESIGN",
      description: "Dịch vụ thiết kế và tùy chỉnh cue theo yêu cầu với chất liệu và công nghệ độc quyền",
      direction: "right",
      color: "rgba(212, 201, 190, 0.1)",
    },
    {
      title: "EXPERT CONSULTING",
      description: "Tư vấn chuyên sâu từ các chuyên gia hàng đầu về billiard cho mọi cấp độ người chơi",
      direction: "left",
      color: "rgba(212, 201, 190, 0.1)",
    },
  ]

  const floatingItems = [
    { src: "/assets/products/billiard/cue1.jpg", alt: "Billiard Cue 1", position: "left" },
    { src: "/assets/products/billiard/cue2.jpg", alt: "Billiard Cue 2", position: "right" },
    { src: "/assets/products/billiard/ball1.jpg", alt: "Billiard Ball Set", position: "left" },
    { src: "/assets/products/billiard/table1.jpg", alt: "Billiard Table", position: "right" },
    { src: "/assets/products/billiard/chalk.jpg", alt: "Billiard Chalk", position: "bottom" },
    { src: "/assets/products/billiard/case.jpg", alt: "Cue Case", position: "bottom" },
    { src: "/assets/products/billiard/glove.jpg", alt: "Billiard Glove", position: "left" },
    { src: "/assets/products/billiard/bridge.jpg", alt: "Billiard Bridge", position: "right" },
  ]

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

          <div className="hero-stats">
            <motion.div className="stat-item" whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
              <span className="stat-number">100+</span>
              <span className="stat-label">PREMIUM MODELS</span>
            </motion.div>
            <motion.div className="stat-item" whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
              <span className="stat-number">50+</span>
              <span className="stat-label">TOP BRANDS</span>
            </motion.div>
            <motion.div className="stat-item" whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
              <span className="stat-number">1000+</span>
              <span className="stat-label">SATISFIED CLIENTS</span>
            </motion.div>
          </div>
        </motion.div>

        <div className="features-waterfall">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`feature-card ${feature.direction}`}
              initial={{
                x: feature.direction === "left" ? -100 : 100,
                opacity: 0,
              }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            >
              <div className="water-drop"></div>
              <div className="feature-content">
                <div className="feature-icon-wrapper" style={{ backgroundColor: feature.color }}>
                  <div className="icon-ripple"></div>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
              <div className="water-stream"></div>
            </motion.div>
          ))}
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

      <div className="floating-items-container">
        {floatingItems.map((item, index) => (
          <motion.img
            key={index}
            src={item.src}
            alt={item.alt}
            className={`floating-item floating-item-${index + 1}`}
            initial={
              item.position === "left"
                ? { x: "-80%", opacity: 0 }
                : item.position === "right"
                  ? { x: "80%", opacity: 0 }
                  : { y: "80%", opacity: 0 }
            }
            animate={{
              x: 0,
              y: 0,
              opacity: 1,
              transition: {
                duration: 1.5,
                delay: index * 0.15,
                type: "spring",
                stiffness: 50,
              },
            }}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.3 },
            }}
          />
        ))}
      </div>
    </section>
  )
}

export default HeaderContent 