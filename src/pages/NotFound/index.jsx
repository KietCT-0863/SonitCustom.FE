import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import './styles.css';

// Đăng ký plugins
gsap.registerPlugin(Physics2DPlugin, MotionPathPlugin);

const NotFoundPage = () => {
  const [showTrail, setShowTrail] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState([]);
  const [ballsClicked, setBallsClicked] = useState({});
  
  // Refs cho animation
  const ballsRef = useRef([]);
  const cueRef = useRef(null);
  const contentRef = useRef(null);
  const tableRef = useRef(null);
  const particlesRef = useRef([]);
  const numberRef = useRef(null);
  
  useEffect(() => {
    // Animation cho các viên bi với GSAP Physics2D
    const balls = document.querySelectorAll('.billiard-ball');
    
    // Lưu trữ các phần tử vào refs
    ballsRef.current = Array.from(balls);
    
    // GSAP Physics2D animation cho các viên bi
    ballsRef.current.forEach((ball, index) => {
      // Vị trí ban đầu
      const initialX = parseInt(ball.style.left) || 0;
      const initialY = parseInt(ball.style.top) || 0;
      
      // Tạo hiệu ứng vật lý 2D cho các viên bi
      gsap.to(ball, {
        duration: 6,
        physics2D: {
          velocity: Math.random() * 20 - 10, // Vận tốc ngẫu nhiên
          angle: Math.random() * 360, // Góc ngẫu nhiên
          gravity: 0,
          friction: 0.1
        },
        repeat: -1,
        repeatRefresh: true, // Tạo giá trị mới cho mỗi lần lặp
        yoyo: true,
        ease: "power1.inOut"
      });
      
      // Thêm hiệu ứng xoay nhẹ
      gsap.to(ball, {
        rotation: `random(-20, 20)`,
        duration: Math.random() * 4 + 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
    
    // Animation cho bàn billiard
    gsap.fromTo(tableRef.current, 
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" }
    );
    
    // Animation cho cue bằng MotionPath
    if (cueRef.current) {
      // Bắt đầu với hiệu ứng xuất hiện
      gsap.from(cueRef.current, {
        rotation: -45,
        x: -100,
        opacity: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        delay: 0.5
      });
      
      // Tạo chuyển động qua lại mượt mà
      gsap.to(cueRef.current, {
        motionPath: {
          path: [{x: 0, y: 0}, {x: -30, y: 0}, {x: 0, y: 0}],
          curviness: 0.5
        },
        rotation: "random(-5, 5)",
        duration: 3.5,
        repeat: -1,
        ease: "power1.inOut"
      });
    }
    
    // Hiệu ứng số 404 
    const number404 = document.querySelector('h1');
    if (number404) {
      // Hiệu ứng "bounce" cho số 404
      gsap.fromTo(number404, 
        { opacity: 0, scale: 0.5, y: -50 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          duration: 1.5, 
          ease: "elastic.out(1, 0.3)",
          onComplete: () => {
            // Sau khi xuất hiện, tạo hiệu ứng nhấp nháy
            gsap.to(number404, {
              textShadow: "0 0 20px rgba(212, 201, 190, 0.8)",
              repeat: -1,
              yoyo: true,
              duration: 2,
              ease: "sine.inOut"
            });
          }
        }
      );
    }
    
    // Hiệu ứng chuyển động mượt mà khi trang load
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.7 }
    );
    
    // Animation cho các hạt với Physics2D
    particlesRef.current.forEach((particle, index) => {
      gsap.to(particle, {
        duration: 8,
        physics2D: {
          velocity: Math.random() * 15,
          angle: Math.random() * 360,
          gravity: 0,
          friction: 0.02
        },
        opacity: `random(0.3, 1, 0.1)`,
        scale: `random(0.5, 1.5, 0.1)`,
        repeat: -1,
        repeatRefresh: true,
        ease: "none"
      });
    });
    
    // Text glitch effect
    const glitchText = document.querySelector('.glitch');
    if (glitchText) {
      const tl = gsap.timeline({repeat: -1, repeatDelay: 3});
      tl.to(glitchText, {
        skewX: 20,
        duration: 0.1,
        ease: "power1.inOut"
      })
      .to(glitchText, {
        skewX: 0,
        duration: 0.1,
        ease: "power1.inOut"
      })
      .to(glitchText, {
        opacity: 0.8,
        duration: 0.1,
        ease: "power1.inOut"
      })
      .to(glitchText, {
        opacity: 1,
        duration: 0.1,
        ease: "power1.inOut"
      })
      .to(glitchText, {
        x: -5,
        duration: 0.1,
        ease: "power1.inOut"
      })
      .to(glitchText, {
        x: 5,
        duration: 0.1,
        ease: "power1.inOut"
      })
      .to(glitchText, {
        x: 0,
        duration: 0.1,
        ease: "power1.inOut"
      });
      
      // Thêm hiệu ứng color shift
      gsap.to(glitchText, {
        color: "random([#D4C9BE, #ff3333, #33ff33, #3333ff])",
        duration: 0.2,
        repeat: -1,
        repeatRefresh: true,
        repeatDelay: 2
      });
    }
    
    // Clean up GSAP animations
    return () => {
      gsap.killTweensOf(ballsRef.current);
      gsap.killTweensOf(cueRef.current);
      gsap.killTweensOf(contentRef.current);
      gsap.killTweensOf(particlesRef.current);
      gsap.killTweensOf('.glitch');
      gsap.killTweensOf('h1');
    };
  }, []);
  
  // Hiệu ứng mouse trail với GSAP
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (showTrail) {
        setMousePosition({ x: e.clientX, y: e.clientY });
        
        // Tạo mới trail với vị trí chuột hiện tại
        setTrails(prevTrails => {
          const newTrail = { x: e.clientX, y: e.clientY, id: Date.now() };
          const updatedTrails = [...prevTrails, newTrail];
          
          // Giới hạn số lượng trail để tránh quá nhiều hiệu ứng
          if (updatedTrails.length > 10) {
            return updatedTrails.slice(updatedTrails.length - 10);
          }
          return updatedTrails;
        });
        
        // Animation cho gậy cue theo hướng chuột
        if (cueRef.current) {
          const tableRect = tableRef.current.getBoundingClientRect();
          const tableCenterX = tableRect.left + tableRect.width / 2;
          const tableCenterY = tableRect.top + tableRect.height / 2;
          
          // Tính góc giữa trung tâm bàn và vị trí chuột
          const angle = Math.atan2(e.clientY - tableCenterY, e.clientX - tableCenterX) * (180/Math.PI);
          
          // Xoay gậy cue theo hướng chuột
          gsap.to(cueRef.current, {
            rotation: angle + 180, // Thêm 180 để gậy hướng về phía chuột
            duration: 0.5,
            ease: "power2.out"
          });
        }
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Xóa các trail sau một khoảng thời gian
    const interval = setInterval(() => {
      if (trails.length > 0) {
        setTrails(prevTrails => prevTrails.slice(1));
      }
    }, 200);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, [showTrail, trails]);
  
  // Toggle hiệu ứng cue trail
  const toggleTrail = () => {
    setShowTrail(!showTrail);
    
    // Animation cho nút toggle
    gsap.to('.toggle-trail-button', {
      scale: 1.1,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power1.inOut"
    });
    
    // Hiệu ứng ripple khi click
    const createRipple = (e) => {
      const button = e.currentTarget;
      const circle = document.createElement('div');
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - button.getBoundingClientRect().left - diameter / 2}px`;
      circle.style.top = `${e.clientY - button.getBoundingClientRect().top - diameter / 2}px`;
      circle.classList.add('ripple');
      
      const ripple = button.querySelector('.ripple');
      if (ripple) {
        ripple.remove();
      }
      
      button.appendChild(circle);
      
      gsap.to(circle, {
        scale: 2,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => circle.remove()
      });
    };
    
    // Tạo hiệu ứng ripple cho nút
    const button = document.querySelector('.toggle-trail-button');
    if (button) createRipple({ currentTarget: button, clientX: button.getBoundingClientRect().left + button.offsetWidth / 2, clientY: button.getBoundingClientRect().top + button.offsetHeight / 2 });
  };
  
  // Xử lý sự kiện click vào bi với GSAP
  const handleBallClick = (ballId) => {
    // Đánh dấu bi đã bị click
    setBallsClicked(prev => ({ ...prev, [ballId]: true }));
    
    // Animation khi click
    const ball = document.querySelector(`.${ballId}`);
    if (ball) {
      // Hiệu ứng bật lên và phóng to
      gsap.timeline()
        .to(ball, {
          scale: 1.5,
          duration: 0.3,
          ease: "back.out(3)"
        })
        .to(ball, {
          scale: 1,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)"
        });
      
      // Hiệu ứng ánh sáng
      gsap.to(ball, {
        boxShadow: "0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 0.4)",
        duration: 0.3,
        yoyo: true,
        repeat: 3
      });
      
      // Tạo hiệu ứng đường dẫn (path) cho bi sau khi bị đánh
      gsap.to(ball, {
        motionPath: {
          path: [
            {x: 0, y: 0}, 
            {x: Math.random() * 100 - 50, y: Math.random() * 100 - 50},
            {x: Math.random() * 150 - 75, y: Math.random() * 100 - 50},
            {x: 0, y: 0}
          ],
          curviness: 1.5
        },
        duration: 2,
        ease: "power1.inOut"
      });
      
      // Animation cho các bi khác
      ballsRef.current.forEach(otherBall => {
        if (!otherBall.classList.contains(ballId)) {
          gsap.to(otherBall, {
            physics2D: {
              velocity: Math.random() * 30 - 15,
              angle: Math.random() * 360,
              gravity: 0,
              friction: 0.3
            },
            duration: 3,
            ease: "power2.out"
          });
        }
      });
    }
    
    // Thêm âm thanh "click" khi bị hit
    const clickSound = new Audio('/assets/ball-hit.mp3');
    if (clickSound) {
      clickSound.volume = 0.5;
      clickSound.play().catch(() => {
        // Xử lý trường hợp browser chặn autoplay
        console.log('Audio playback was blocked');
      });
    }
    
    // Sau 1.5s reset lại trạng thái bi
    setTimeout(() => {
      setBallsClicked(prev => ({ ...prev, [ballId]: false }));
    }, 1500);
  };
  
  // Quay lại trang trước với animation
  const handleGoBack = () => {
    gsap.to('.not-found-container', {
      opacity: 0,
      y: -50,
      duration: 0.5,
      onComplete: () => window.history.back()
    });
  };
  
  // Đến trang chủ với animation
  const handleGoHome = () => {
    gsap.to('.not-found-container', {
      opacity: 0,
      y: -50,
      duration: 0.5
    });
  };
  
  return (
    <div className="not-found-container">
      <div className="billiard-table" ref={tableRef}>
        <div className="table-felt">
          <div className="table-border"></div>
          
          {/* Billiard balls animation */}
          <div 
            className={`billiard-ball ball-1 ${ballsClicked['ball-1'] ? 'clicked' : ''}`}
            onClick={() => handleBallClick('ball-1')}
          >4</div>
          <div 
            className={`billiard-ball ball-2 ${ballsClicked['ball-2'] ? 'clicked' : ''}`}
            onClick={() => handleBallClick('ball-2')}
          >0</div>
          <div 
            className={`billiard-ball ball-3 ${ballsClicked['ball-3'] ? 'clicked' : ''}`}
            onClick={() => handleBallClick('ball-3')}
          >4</div>
          <div 
            className={`billiard-ball ball-8 ${ballsClicked['ball-8'] ? 'clicked' : ''}`}
            onClick={() => handleBallClick('ball-8')}
          ></div>
          <div 
            className={`billiard-ball ball-9 ${ballsClicked['ball-9'] ? 'clicked' : ''}`}
            onClick={() => handleBallClick('ball-9')}
          ></div>
          
          {/* Cue stick animation with laser trace effect */}
          <div 
            className={`billiard-cue ${showTrail ? 'with-trail' : ''}`}
            ref={cueRef}
          >
            <div className="cue-stick"></div>
            <div className="cue-tip"></div>
            {showTrail && (
              <div className="laser-line" style={{
                width: `${Math.sqrt(Math.pow(mousePosition.x - window.innerWidth/2, 2) + Math.pow(mousePosition.y - window.innerHeight/2, 2))}px`,
                transform: `rotate(${Math.atan2(mousePosition.y - window.innerHeight/2, mousePosition.x - window.innerWidth/2) * (180/Math.PI)}deg)`
              }}></div>
            )}
          </div>
          
          {/* Pocket holes */}
          <div className="pocket top-left"></div>
          <div className="pocket top-right"></div>
          <div className="pocket bottom-left"></div>
          <div className="pocket bottom-right"></div>
          <div className="pocket middle-left"></div>
          <div className="pocket middle-right"></div>
        </div>
      </div>
      
      <div className="content-container" ref={contentRef}>
        <h1 ref={numberRef}>404</h1>
        <div className="glitch-wrapper">
          <div className="glitch" data-text="SCRATCH!">SCRATCH!</div>
        </div>
        <p className="error-message">The ball you're looking for has fallen into the pocket.</p>
        <p className="sub-message">The page you requested doesn't exist or has been moved.</p>
        
        <div className="actions">
          <Link to="/" className="home-button" onClick={handleGoHome}>
            <span>Rack 'em up again</span>
          </Link>
          <button onClick={handleGoBack} className="back-button">
            <span className="arrow-left">←</span> Go Back
          </button>
          <button onClick={toggleTrail} className="toggle-trail-button">
            {showTrail ? 'Hide Laser Guide' : 'Show Laser Guide'}
          </button>
        </div>
        
        <div className="tips">
          <p>🎱 Try clicking on the billiard balls for a surprise!</p>
        </div>
      </div>
      
      {/* Particles for ambiance */}
      <div className="particles">
        {[...Array(15)].map((_, index) => (
          <div 
            key={index} 
            className="particle"
            ref={el => {
              if (el && !particlesRef.current.includes(el)) {
                particlesRef.current[index] = el;
              }
            }}
          ></div>
        ))}
      </div>
      
      {/* Mouse trail effect */}
      {trails.map(trail => {
        const trailRef = useRef(null);
        
        useEffect(() => {
          if (trailRef.current) {
            gsap.fromTo(trailRef.current,
              { opacity: 1, scale: 1 },
              { 
                opacity: 0, 
                scale: 0, 
                duration: 0.8, 
                ease: "power1.out",
              }
            );
          }
        }, []);
        
        return (
          <div
            key={trail.id}
            ref={trailRef}
            className="mouse-trail"
            style={{ 
              left: `${trail.x}px`, 
              top: `${trail.y}px` 
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default NotFoundPage; 