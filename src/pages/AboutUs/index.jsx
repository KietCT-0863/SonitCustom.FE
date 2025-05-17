import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './styles.css';

const AboutUs = () => {
  const milestones = [
    {
      year: "2020",
      title: "Khởi Nguồn Đam Mê",
      description: "SONIT CUSTOM ra đời từ niềm đam mê với billiard và khát vọng mang đến những sản phẩm độc đáo, chất lượng cao cho người chơi chuyên nghiệp.",
      icon: "🌟"
    },
    {
      year: "2021",
      title: "Phát Triển Dịch Vụ",
      description: "Mở rộng dịch vụ custom cue và trở thành điểm đến tin cậy cho các tay chơi billiard chuyên nghiệp trong và ngoài nước.",
      icon: "📈"
    },
    {
      year: "2022",
      title: "Đối Tác Toàn Cầu",
      description: "Thiết lập quan hệ đối tác với các thương hiệu billiard hàng đầu thế giới, mở rộng danh mục sản phẩm độc quyền.",
      icon: "🤝"
    },
    {
      year: "2023",
      title: "Vươn Tầm Quốc Tế",
      description: "Phát triển thương hiệu ra thị trường quốc tế, ra mắt bộ sưu tập cue cao cấp được thiết kế riêng cho thị trường châu Á.",
      icon: "🌏"
    }
  ];

  const values = [
    {
      icon: "💎",
      title: "Chất Lượng Đỉnh Cao",
      description: "Mỗi sản phẩm đều được chọn lọc và kiểm tra kỹ lưỡng để đảm bảo chất lượng tốt nhất",
      color: "#FFD700"
    },
    {
      icon: "🎯",
      title: "Độc Quyền & Sáng Tạo",
      description: "Thiết kế độc quyền, sáng tạo không ngừng để tạo ra những sản phẩm độc đáo",
      color: "#E6007E"
    },
    {
      icon: "🤝",
      title: "Dịch Vụ Tận Tâm",
      description: "Đội ngũ chuyên gia giàu kinh nghiệm, sẵn sàng tư vấn và hỗ trợ 24/7",
      color: "#4CAF50"
    },
    {
      icon: "🚀",
      title: "Đổi Mới Liên Tục",
      description: "Không ngừng cập nhật xu hướng và công nghệ mới trong ngành billiard",
      color: "#2196F3"
    }
  ];

  const achievements = [
    { number: "1000+", label: "Khách Hàng Hài Lòng" },
    { number: "500+", label: "Mẫu Cue Độc Quyền" },
    { number: "50+", label: "Đối Tác Toàn Cầu" },
    { number: "10+", label: "Năm Kinh Nghiệm" }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="about-us">
      {/* Hero Section */}
      <motion.section 
        className="about-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="hero-overlay"></div>
        <motion.div 
          className="hero-content"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <h1>SONIT CUSTOM</h1>
          <p>Nơi Nghệ Thuật Gặp Gỡ Đam Mê Billiard</p>
          <motion.div 
            className="hero-stats"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {achievements.map((achievement, index) => (
              <motion.div 
                key={index}
                className="stat-item"
                variants={fadeInUp}
              >
                <span className="stat-number">{achievement.number}</span>
                <span className="stat-label">{achievement.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Story Section */}
      <section className="about-story">
        <motion.div 
          className="story-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2>Câu Chuyện Của Chúng Tôi</h2>
          <div className="story-grid">
            <div className="story-text">
              <p>
                SONIT CUSTOM được thành lập bởi những người đam mê billiard, với khát vọng mang đến những sản phẩm billiard đẳng cấp thế giới cho người chơi Việt Nam.
              </p>
              <p>
                Chúng tôi không chỉ đơn thuần là nơi cung cấp các sản phẩm billiard, mà còn là nơi tạo ra những tác phẩm nghệ thuật độc đáo, kết hợp giữa thẩm mỹ và công năng.
              </p>
              <p>
                Với đội ngũ thợ thủ công lành nghề và các chuyên gia trong ngành, chúng tôi tự hào mang đến những sản phẩm chất lượng cao nhất, đáp ứng mọi nhu cầu của người chơi billiard chuyên nghiệp.
              </p>
            </div>
            <div className="story-image">
              <img src="/assets/about/workshop.jpg" alt="SONIT CUSTOM Workshop" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <h2>Giá Trị Cốt Lõi</h2>
        <motion.div 
          className="values-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {values.map((value, index) => (
            <motion.div 
              key={index}
              className="value-card"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              <div className="value-icon" style={{ backgroundColor: value.color }}>
                <span>{value.icon}</span>
              </div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Milestones Section */}
      <section className="about-milestones">
        <h2>Hành Trình Phát Triển</h2>
        <div className="timeline">
          {milestones.map((milestone, index) => (
            <motion.div 
              key={index}
              className="timeline-item"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="timeline-content">
                <div className="timeline-icon">{milestone.icon}</div>
                <span className="year">{milestone.year}</span>
                <h3>{milestone.title}</h3>
                <p>{milestone.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="about-contact">
        <motion.div 
          className="contact-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2>Liên Hệ Với Chúng Tôi</h2>
          <p>Hãy để chúng tôi giúp bạn tìm được sản phẩm hoàn hảo nhất</p>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <p>+84 123 456 789</p>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <p>contact@sonitcustom.com</p>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <p>123 Đường ABC, Quận XYZ, TP.HCM</p>
            </div>
          </div>
          <motion.button 
            className="contact-btn"
            whileHover={{ scale: 1.05, backgroundColor: "#D4C9BE" }}
            whileTap={{ scale: 0.95 }}
          >
            Liên Hệ Ngay
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutUs;