"use client";

import { useState } from "react";
import { motion, useAnimation } from "framer-motion";

/**
 * CreationIllustration
 *
 * Props:
 *   forceHovered — bool, drive the hover animation externally
 */
export default function CreationIllustration({
  forceHovered = false,
}: {
  forceHovered?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const isActive = hovered || forceHovered;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: 340,
        height: 360,
        margin: "0 auto",
        userSelect: "none",
      }}
    >
      {/* Halo glow behind bulb */}
      <motion.div
        animate={{
          opacity: isActive ? 0.55 : 0.15,
          scale: isActive ? 1.3 : 1,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          position: "absolute",
          top: 68,
          left: "calc(50% - 60px)",
          width: 120,
          height: 120,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, #FFD400 0%, rgba(255,212,0,0) 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Floating elements ── */}

      {/* Torn paper "IDÉE" */}
      <motion.div
        animate={{
          y: isActive ? -6 : 0,
          rotate: isActive ? -8 : -6,
          opacity: isActive ? 1 : 0.85,
        }}
        transition={{
          y: {
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          },
          rotate: {
            duration: 4,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: 0.3,
          },
        }}
        style={{
          position: "absolute",
          top: 40,
          left: 20,
          zIndex: 5,
        }}
      >
        <div
          style={{
            background: "#fff",
            border: "1.5px solid #e0e0e0",
            borderRadius: "4px 4px 0 4px",
            padding: "4px 8px",
            fontSize: 11,
            fontWeight: 700,
            color: "#111",
            letterSpacing: 1,
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            clipPath:
              "polygon(0 0, 100% 0, 100% 85%, 92% 100%, 80% 88%, 65% 100%, 50% 86%, 35% 100%, 20% 88%, 8% 100%, 0 85%)",
          }}
        >
          IDÉE
        </div>
      </motion.div>

      {/* Pink post-it with crown */}
      <motion.div
        animate={{
          y: isActive ? 5 : 0,
          rotate: isActive ? 6 : 5,
        }}
        transition={{
          y: {
            duration: 3.5,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: 0.5,
          },
          rotate: {
            duration: 5,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          },
        }}
        style={{
          position: "absolute",
          top: 30,
          right: 30,
          zIndex: 5,
        }}
      >
        <div
          style={{
            background: "#FF4DA6",
            width: 46,
            height: 46,
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 16px rgba(255,77,166,0.35)",
          }}
        >
          {/* Crown doodle */}
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
            <path
              d="M2 14 L2 8 L6 12 L11 2 L16 12 L20 8 L20 14 Z"
              fill="#fff"
              stroke="#fff"
              strokeWidth="1"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </motion.div>

      {/* "CRÉATIVITÉ" label */}
      <motion.div
        animate={{
          y: isActive ? -4 : 0,
          rotate: isActive ? 3 : 2,
        }}
        transition={{
          y: {
            duration: 4,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: 0.8,
          },
        }}
        style={{
          position: "absolute",
          top: 130,
          right: 10,
          zIndex: 5,
        }}
      >
        <div
          style={{
            background: "#111",
            color: "#FFD400",
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: 1.5,
            padding: "4px 8px",
            borderRadius: 4,
            boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
          }}
        >
          CRÉATIVITÉ
        </div>
      </motion.div>

      {/* Megaphone */}
      <motion.div
        animate={{
          y: isActive ? 4 : 0,
          rotate: isActive ? -10 : -8,
        }}
        transition={{
          y: {
            duration: 3.2,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: 0.2,
          },
        }}
        style={{
          position: "absolute",
          bottom: 90,
          left: 14,
          zIndex: 5,
        }}
      >
        <div
          style={{
            background: "#fff",
            width: 38,
            height: 38,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#111"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 11l17-7v16L3 13v-2z" />
            <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
          </svg>
        </div>
      </motion.div>

      {/* Paint spray can */}
      <motion.div
        animate={{
          y: isActive ? -5 : 0,
          rotate: isActive ? 12 : 10,
        }}
        transition={{
          y: {
            duration: 3.8,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: 1,
          },
        }}
        style={{
          position: "absolute",
          bottom: 80,
          right: 18,
          zIndex: 5,
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #111 60%, #FFD400)",
            width: 34,
            height: 34,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
          }}
        >
          <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
            <rect x="4" y="4" width="8" height="12" rx="3" fill="#FFD400" />
            <rect
              x="6"
              y="1"
              width="4"
              height="4"
              rx="1"
              fill="#fff"
              opacity="0.7"
            />
            <circle cx="11" cy="2" r="1.5" fill="#FFD400" />
            <path
              d="M11 2 Q13 0 14 3"
              stroke="#FFD400"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M11 2 Q14 2 14 5"
              stroke="#FFD400"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>
      </motion.div>

      {/* Crumpled paper ball */}
      <motion.div
        animate={{
          y: isActive ? 6 : 0,
          rotate: isActive ? -15 : -10,
        }}
        transition={{
          y: {
            duration: 4.5,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: 0.6,
          },
        }}
        style={{
          position: "absolute",
          bottom: 50,
          left: 60,
          zIndex: 5,
        }}
      >
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #e0e0e0, #bbb)",
            boxShadow:
              "inset 2px 2px 4px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.1)",
          }}
        />
      </motion.div>

      {/* Pencil */}
      <motion.div
        animate={{
          y: isActive ? -3 : 0,
          rotate: isActive ? 18 : 15,
        }}
        transition={{
          y: {
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: 1.2,
          },
        }}
        style={{
          position: "absolute",
          bottom: 55,
          right: 60,
          zIndex: 5,
        }}
      >
        <svg width="10" height="40" viewBox="0 0 10 40">
          <rect x="1" y="6" width="8" height="28" rx="1" fill="#FFD400" />
          <polygon points="1,34 9,34 5,40" fill="#FFAB40" />
          <polygon points="3,37 7,37 5,40" fill="#E65100" />
          <rect x="1" y="2" width="8" height="6" rx="1" fill="#bbb" />
          <rect x="0" y="0" width="10" height="3" rx="1" fill="#e08080" />
        </svg>
      </motion.div>

      {/* ── Doodles (stars / zigzags) ── */}
      <motion.div
        animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1.1 : 1 }}
        transition={{ duration: 0.6 }}
        style={{
          position: "absolute",
          top: 80,
          left: 60,
          zIndex: 3,
          pointerEvents: "none",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20">
          <path
            d="M10 2 L11.5 8 L17 10 L11.5 12 L10 18 L8.5 12 L3 10 L8.5 8 Z"
            fill="#FFD400"
            opacity="0.8"
          />
        </svg>
      </motion.div>

      <motion.div
        animate={{ opacity: isActive ? 1 : 0.4, rotate: isActive ? 30 : 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        style={{
          position: "absolute",
          top: 60,
          right: 80,
          zIndex: 3,
          pointerEvents: "none",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14">
          <path
            d="M7 1 L8 5.5 L12.5 7 L8 8.5 L7 13 L6 8.5 L1.5 7 L6 5.5 Z"
            fill="#FF4DA6"
            opacity="0.9"
          />
        </svg>
      </motion.div>

      {/* Zigzag lines */}
      <motion.div
        animate={{ opacity: isActive ? 0.8 : 0.3 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "absolute",
          top: 155,
          left: 30,
          zIndex: 3,
          pointerEvents: "none",
        }}
      >
        <svg width="30" height="12" viewBox="0 0 30 12">
          <polyline
            points="0,10 5,2 10,10 15,2 20,10 25,2 30,10"
            stroke="#FFD400"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* Paint splatter */}
      <motion.div
        animate={{ scale: isActive ? 1.2 : 1, opacity: isActive ? 0.7 : 0.3 }}
        transition={{ duration: 0.6 }}
        style={{
          position: "absolute",
          top: 100,
          right: 50,
          zIndex: 3,
          pointerEvents: "none",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 22 22">
          <circle cx="11" cy="11" r="4" fill="#FF4DA6" />
          <circle cx="5" cy="6" r="2" fill="#FF4DA6" opacity="0.6" />
          <circle cx="17" cy="5" r="1.5" fill="#FF4DA6" opacity="0.5" />
          <circle cx="18" cy="16" r="2.5" fill="#FF4DA6" opacity="0.4" />
          <circle cx="4" cy="17" r="1.5" fill="#FF4DA6" opacity="0.5" />
        </svg>
      </motion.div>

      {/* Inspiration lines around bulb */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <motion.div
          key={angle}
          animate={{
            opacity: isActive ? 0.7 : 0,
            scale: isActive ? 1 : 0.5,
          }}
          transition={{ duration: 0.4, delay: i * 0.04 }}
          style={{
            position: "absolute",
            top: 128,
            left: "50%",
            width: 18,
            height: 2,
            borderRadius: 1,
            background: "#FFD400",
            transformOrigin: "left center",
            transform: `translateX(36px) rotate(${angle}deg)`,
            zIndex: 3,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* ── Particles ── */}
      {[
        { top: 50, left: "40%", delay: 0 },
        { top: 90, left: "65%", delay: 0.8 },
        { top: 140, left: "28%", delay: 1.6 },
        { top: 70, left: "55%", delay: 2.4 },
      ].map((p, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: [0, 0.8, 0],
            y: [0, -18, -36],
            scale: [0.5, 1, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeOut",
          }}
          style={{
            position: "absolute",
            top: p.top,
            left: p.left,
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#FFD400",
            zIndex: 4,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* ── Main bulb ── */}
      <motion.div
        animate={{
          y: [0, -8, 0],
          x: "-50%",
          scale: isActive ? 1.06 : 1,
        }}
        transition={{
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 0.5, ease: "easeOut" },
        }}
        style={{
          position: "absolute",
          top: 60,
          left: "50%",
          zIndex: 6,
        }}
      >
        <svg
          width="160"
          height="190"
          viewBox="0 0 110 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer glow filter */}
          <defs>
            <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="bulbGrad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FFF176" />
              <stop offset="50%" stopColor="#FFD400" />
              <stop offset="100%" stopColor="#F9A825" />
            </radialGradient>
            <radialGradient id="baseShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#5D4037" />
              <stop offset="100%" stopColor="#3E2723" />
            </radialGradient>
          </defs>

          {/* Bulb body */}
          <ellipse
            cx="55"
            cy="58"
            rx="34"
            ry="34"
            fill="url(#bulbGrad)"
            filter="url(#glow)"
          />

          {/* Shine highlight */}
          <ellipse
            cx="43"
            cy="44"
            rx="10"
            ry="13"
            fill="rgba(255,255,255,0.45)"
            transform="rotate(-20 43 44)"
          />
          <ellipse
            cx="47"
            cy="40"
            rx="4"
            ry="6"
            fill="rgba(255,255,255,0.6)"
            transform="rotate(-20 47 40)"
          />

          {/* Neck / base connector */}
          <rect x="42" y="86" width="26" height="8" rx="2" fill="#E6A800" />
          <rect x="44" y="92" width="22" height="5" rx="1" fill="#CC9400" />
          <rect x="42" y="95" width="26" height="5" rx="1" fill="#B8860B" />
          <rect x="44" y="99" width="22" height="4" rx="1" fill="#CC9400" />

          {/* Flat base */}
          <rect x="40" y="102" width="30" height="6" rx="2" fill="#9E7700" />

          {/* Face — wink */}
          {/* Left eye closed (wink line) */}
          <path
            d="M44 55 Q47 52 50 55"
            stroke="#5D4037"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          {/* Right eye open */}
          <circle cx="62" cy="53" r="3.5" fill="#5D4037" />
          <circle cx="63" cy="52" r="1.2" fill="rgba(255,255,255,0.5)" />
          {/* Smile */}
          <path
            d="M46 63 Q55 70 65 63"
            stroke="#5D4037"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* ── Box / boîte à idées ── */}
      <div
        style={{
          position: "absolute",
          bottom: 14,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 5,
        }}
      >
        {/* Box lid open */}
        <motion.div
          animate={{ rotateX: isActive ? -70 : -30 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            width: 90,
            height: 18,
            background: "#1a1a1a",
            border: "2px solid #333",
            borderRadius: "4px 4px 0 0",
            transformOrigin: "top center",
            marginBottom: -2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 20,
              height: 3,
              background: "#FFD400",
              borderRadius: 2,
            }}
          />
        </motion.div>

        {/* Box body */}
        <div
          style={{
            width: 90,
            height: 44,
            background: "#111",
            border: "2px solid #333",
            borderRadius: "0 0 6px 6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
          }}
        >
          <div
            style={{
              fontSize: 9,
              fontWeight: 800,
              color: "#FFD400",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            IDÉES
          </div>
        </div>
      </div>
    </div>
  );
}
