/* eslint-disable react/no-unescaped-entities */
// components/Features.js
"use client";
import { useEffect } from "react";
import styles from "./Features.module.css"; // Importer le CSS
import StackAnimation from "@/lib/animation";
import { HoverBorderGradient } from "./hover-border-gradient";
import { WrapperEffect } from "./Wrapper";
import { motion } from "framer-motion";
const StackedCard = () => {
  useEffect(() => {
    StackAnimation();
  }, []);

  return (
    <div className={`${styles.center} h-screen`}>
      <div className={`${styles.stackArea} stack-area`}>
        <div className={`${styles.left} pl-32`}>
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="w-full"
          >
            <h2 className="text-5xl font-bold text-left">À PROPOS DE NOUS</h2>
          </motion.div>

          <div className="flex flex-col justify-between gap-10">
            <motion.p
              initial={{ x: "-100%" }}
              whileInView={{ x: "0%" }}
              transition={{ duration: 1.3, ease: "easeInOut" }}
              viewport={{ once: true }}
              className="text-base md:text-2xl font-normal text-neutral-700 dark:text-neutral-200 mt-2 "
            >
              Vanity Corp est le combo parfait d'un génie du marketing, d'un
              créateur de contenu qui fait le buzz auprès de centaines de
              milliers de followers, et d'un réalisateur qui transforme vos
              idées en chef-d'oeuvre.
            </motion.p>
            <motion.div
              initial={{ x: "-100%" }}
              whileInView={{ x: "0%" }}
              transition={{ duration: 1.7, ease: "easeInOut" }}
              viewport={{ once: true }}
            >
              <HoverBorderGradient className="flex gap-2 items-center">
                Travaillons ensemble{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </HoverBorderGradient>
            </motion.div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className={styles.right}
        >
          <div className={styles.cards}>
            <div className={`${styles.card} bg-white shadow-md card `}>
              <div className="text-[100px] text-center">💻</div>
              <div className="text-2xl text-black font-semibold text-center">
                +1623 heures de montage
              </div>
            </div>
            <div className={`${styles.card} bg-white shadow-md card`}>
              <div className="text-[100px] text-center">💡</div>
              <div className="text-2xl text-black font-semibold text-center">
                +590 idées crées
              </div>
            </div>
            <div className={`${styles.card} bg-white shadow-md card`}>
              <div className="text-[100px] text-center">🤯</div>
              <div className="text-2xl text-black font-semibold text-center">
                Boom ! Des centaines d'abonnés gagnés
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StackedCard;
