"use client"

import type React from "react"
import Link from "next/link"
import type { ReactNode } from "react"

interface CustomLinkProps {
  href: string
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  variant?: "default" | "footer" | "social" | "cta"
}

export default function CustomLink({
  href,
  children,
  className = "",
  style = {},
  variant = "default",
}: CustomLinkProps) {
  const getVariantStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      color: "inherit",
      textDecoration: "none",
      fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
      fontWeight: 500,
      letterSpacing: "0.025em",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative",
      display: "inline-block",
    }

    switch (variant) {
      case "footer":
        return {
          ...baseStyles,
          fontSize: "1rem",
          fontWeight: 500,
          letterSpacing: "0.5px",
          lineHeight: 1.6,
          textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
        }

      case "social":
        return {
          ...baseStyles,
          fontSize: "1.3rem",
          fontWeight: 600,
          transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }

      case "cta":
        return {
          ...baseStyles,
          fontFamily: "'Poppins', 'Inter', sans-serif",
          fontSize: "1.2rem",
          fontWeight: 700,
          letterSpacing: "1.5px",
          textTransform: "uppercase" as const,
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
        }

      default:
        return baseStyles
    }
  }

  const combinedStyles: React.CSSProperties = {
    ...getVariantStyles(),
    ...style,
  }

  return (
    <>
      <Link href={href} className={`modern-link ${className}`} style={combinedStyles}>
        {children}
      </Link>

      <style jsx>{`
        .modern-link {
          background: linear-gradient(135deg, transparent 0%, transparent 100%);
          background-size: 200% 200%;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .modern-link::before {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #dc2626, #ffffff);
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 1px;
        }
        
        .modern-link:hover::before {
          width: 100%;
        }
        
        .modern-link:hover {
          transform: translateY(-1px);
          text-shadow: 0 2px 8px rgba(220, 38, 38, 0.3);
          filter: brightness(1.1);
        }
        
        .modern-link:active {
          transform: translateY(0);
          transition: transform 0.1s ease;
        }
        
        /* Efecto de brillo sutil */
        .modern-link::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          transition: left 0.6s ease;
          pointer-events: none;
        }
        
        .modern-link:hover::after {
          left: 100%;
        }
        
        /* Variantes específicas */
        .modern-link.footer-link {
          font-optical-sizing: auto;
          font-variation-settings: "wght" 500;
        }
        
        .modern-link.footer-link:hover {
          font-variation-settings: "wght" 600;
          color: #ffffff;
          text-shadow: 0 0 10px rgba(220, 38, 38, 0.4);
        }
        
        .modern-link.social-link {
          border-radius: 50%;
          overflow: hidden;
        }
        
        .modern-link.social-link:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 8px 25px rgba(220, 38, 38, 0.4);
        }
        
        .modern-link.cta-button {
          border-radius: 50px;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }
        
        .modern-link.cta-button::before {
          display: none;
        }
        
        .modern-link.cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(220, 38, 38, 0.4);
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }
        
        /* Animación de entrada */
        @keyframes linkFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .modern-link {
          animation: linkFadeIn 0.6s ease-out;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .modern-link {
            font-size: 0.95rem;
            letter-spacing: 0.3px;
          }
          
          .modern-link:hover {
            transform: translateY(-0.5px);
          }
        }
        
        /* Mejoras de accesibilidad */
        .modern-link:focus {
          outline: 2px solid #dc2626;
          outline-offset: 2px;
          border-radius: 4px;
        }
        
        .modern-link:focus:not(:focus-visible) {
          outline: none;
        }
        
        /* Soporte para modo oscuro */
        @media (prefers-color-scheme: dark) {
          .modern-link {
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
          }
        }
        
        /* Soporte para reducción de movimiento */
        @media (prefers-reduced-motion: reduce) {
          .modern-link,
          .modern-link::before,
          .modern-link::after {
            transition: none;
            animation: none;
          }
        }
      `}</style>
    </>
  )
}
