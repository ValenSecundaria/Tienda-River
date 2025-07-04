"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import CustomLink from "../../custom-links"

interface SlideData {
  id: number
  backgroundImage: string
  title: string
  subtitle: string
  phrase: string
  buttonText: string
  buttonLink: string
}

const slidesData: SlideData[] = [
  {
    id: 1,
    backgroundImage: "/imagenes/fondo-principal/Fondo-banner.png",
    title: "🏆 TIENDA OFICIAL RIVER PLATE",
    subtitle: "Viví la pasión millonaria con la indumentaria oficial",
    phrase: "⚪🔴 Desde 1901 haciendo historia ⚪🔴",
    buttonText: "Ver Colección Oficial",
    buttonLink: "/components/ofertas",
  },
  {
    id: 2,
    backgroundImage: "/imagenes/fondo-principal/Fondo-banner.png",
    title: "🏆 NUEVA TEMPORADA 2024",
    subtitle: "Descubrí las últimas camisetas y productos oficiales",
    phrase: "⚪🔴 La banda más grande de Argentina ⚪🔴",
    buttonText: "Explorar Novedades",
    buttonLink: "/components/ofertas",
  },
  {
    id: 3,
    backgroundImage: "/imagenes/fondo-principal/Fondo-banner.png",
    title: "🏆 OFERTAS ESPECIALES",
    subtitle: "Aprovechá los mejores precios en productos oficiales",
    phrase: "⚪🔴 Millonario de corazón ⚪🔴",
    buttonText: "Ver Ofertas",
    buttonLink: "/components/ofertas",
  },
]

export default function HeroBannerRiver() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesData.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slidesData.length) % slidesData.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slidesData.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <section className="hero-banner-container">
      <div className="slider-wrapper">
        {slidesData.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? "active" : ""}`}
            style={{
              backgroundImage: `url(${slide.backgroundImage})`,
            }}
          >
            <div className="overlay" />
            <div className="content">
              <div className="text-content">
                <h1 className="title">{slide.title}</h1>
                <p className="subtitle">{slide.subtitle}</p>
                <p className="phrase">{slide.phrase}</p>
                <CustomLink href={slide.buttonLink} className="cta-button">
                  {slide.buttonText}
                </CustomLink>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button className="nav-arrow nav-arrow-left" onClick={goToPrevious}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button className="nav-arrow nav-arrow-right" onClick={goToNext}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 18L15 12L9 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="indicators">
        {slidesData.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      <style jsx>{`
        .hero-banner-container {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 600px;
          overflow: hidden;
          background: #000;
        }

        .slider-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0;
          transition: opacity 1s ease-in-out;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .slide.active {
          opacity: 1;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.75) 0%,
            rgba(139, 0, 0, 0.5) 50%,
            rgba(0, 0, 0, 0.85) 100%
          );
          z-index: 1;
        }

        .content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: white;
          max-width: 900px;
          padding: 0 20px;
          animation: slideUp 1s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .text-content {
          margin-bottom: 2rem;
        }

        .title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 900;
          margin-bottom: 1rem;
          text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.9);
          letter-spacing: -0.02em;
          line-height: 1.1;
          background: linear-gradient(45deg, #ffffff, #dc143c, #ffffff);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 4s ease-in-out infinite;
          font-family: 'Arial Black', 'Helvetica', sans-serif;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .subtitle {
          font-size: clamp(1.2rem, 2.5vw, 1.8rem);
          font-weight: 500;
          margin-bottom: 1.5rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);
          line-height: 1.4;
          color: #f8f9fa;
          font-family: 'Helvetica Neue', 'Arial', sans-serif;
          letter-spacing: 0.5px;
        }

        .phrase {
          font-size: clamp(1rem, 2vw, 1.3rem);
          font-weight: 700;
          margin-bottom: 2.5rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);
          color: #ffffff;
          letter-spacing: 1px;
          font-family: 'Arial Black', 'Helvetica', sans-serif;
          text-transform: uppercase;
          background: linear-gradient(45deg, #ffffff, #f8f9fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #dc143c 0%, #8b0000 100%);
          color: white;
          padding: 20px 45px;
          font-size: 1.2rem;
          font-weight: 800;
          text-decoration: none;
          border-radius: 50px;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          box-shadow: 0 10px 30px rgba(220, 20, 60, 0.5);
          border: 3px solid transparent;
          position: relative;
          overflow: hidden;
          font-family: 'Arial Black', 'Helvetica', sans-serif;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.6s;
        }

        .cta-button:hover::before {
          left: 100%;
        }

        .cta-button:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 40px rgba(220, 20, 60, 0.7);
          border-color: rgba(255, 255, 255, 0.4);
          background: linear-gradient(135deg, #ff1744 0%, #dc143c 100%);
        }

        .cta-button:active {
          transform: translateY(-2px);
        }

        .nav-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.3);
          border: 3px solid rgba(220, 20, 60, 0.8);
          color: white;
          width: 65px;
          height: 65px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 3;
          backdrop-filter: blur(15px);
        }

        .nav-arrow:hover {
          background: rgba(220, 20, 60, 0.9);
          border-color: #ffffff;
          transform: translateY(-50%) scale(1.15);
          box-shadow: 0 8px 25px rgba(220, 20, 60, 0.6);
        }

        .nav-arrow-left {
          left: 30px;
        }

        .nav-arrow-right {
          right: 30px;
        }

        .indicators {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 15px;
          z-index: 3;
          background: rgba(0, 0, 0, 0.3);
          padding: 12px 20px;
          border-radius: 25px;
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.1);
        }

        .indicator {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.6);
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .indicator::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: transparent;
          transition: all 0.3s ease;
        }

        .indicator.active {
          background: #dc143c;
          border-color: #ffffff;
          transform: scale(1.3);
          box-shadow: 0 0 15px rgba(220, 20, 60, 0.8);
        }

        .indicator.active::before {
          background: #ffffff;
        }

        .indicator:hover:not(.active) {
          border-color: #dc143c;
          background: rgba(220, 20, 60, 0.3);
          transform: scale(1.1);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-banner-container {
            height: 80vh;
            min-height: 500px;
          }

          .content {
            padding: 0 15px;
          }

          .nav-arrow {
            width: 55px;
            height: 55px;
          }

          .nav-arrow-left {
            left: 15px;
          }

          .nav-arrow-right {
            right: 15px;
          }

          .cta-button {
            padding: 16px 32px;
            font-size: 1.1rem;
          }

          .indicators {
            bottom: 20px;
            gap: 12px;
            padding: 10px 16px;
          }

          .indicator {
            width: 12px;
            height: 12px;
          }
        }

        @media (max-width: 480px) {
          .hero-banner-container {
            height: 70vh;
            min-height: 450px;
          }

          .nav-arrow {
            width: 50px;
            height: 50px;
          }

          .nav-arrow-left {
            left: 10px;
          }

          .nav-arrow-right {
            right: 10px;
          }

          .cta-button {
            padding: 14px 28px;
            font-size: 1rem;
          }

          .indicators {
            gap: 10px;
            padding: 8px 14px;
          }

          .indicator {
            width: 10px;
            height: 10px;
          }
        }
      `}</style>
    </section>
  )
}
