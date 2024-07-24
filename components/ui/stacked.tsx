/* eslint-disable react/no-unescaped-entities */
// components/Features.js
"use client";
import { useEffect } from "react";
import styles from "./Features.module.css"; // Importer le CSS
import StackAnimation from "@/lib/animation";

const StackedCard = () => {
  useEffect(() => {
    StackAnimation();
  }, []);

  return (
    <div className={styles.center}>
      <div className={`${styles.stackArea} stack-area`}>
        <div className={`${styles.left} pl-32`}>
          <div className="w-full">
            <h2 className="text-5xl font-bold text-left">À PROPOS DE NOUS</h2>
          </div>

          <div className="text-base md:text-2xl font-normal text-neutral-700 dark:text-neutral-200 mt-2 ">
            Vanity Corp est le combo parfait d'un génie du marketing, d'un
            créateur de contenu qui fait le buzz auprès de centaines de milliers
            de followers, et d'un réalisateur qui transforme vos idées en
            chef-d'oeuvre.
            <br />
            <button>See More Details</button>
          </div>
        </div>
        <div className={styles.right}>
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
        </div>
      </div>
    </div>
  );
};

export default StackedCard;
