// @ts-nocheck
"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { animate, scroll, spring } from "motion";
import { ReactLenis } from "lenis/react";

export default function HorizontalScroll(): JSX.Element {
  const ulRef = useRef<HTMLUListElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ul = ulRef.current;
    const section = sectionRef.current;

    if (!ul || !section) {
      // nothing to animate yet
      console.warn(
        "HorizontalScroll: ul or section ref missing — skipping animations."
      );
      return;
    }

    // get li items only from the ul we control (avoid global queries)
    const items = Array.from(ul.querySelectorAll("li")) as HTMLElement[];

    if (!items.length) {
      console.warn(
        "HorizontalScroll: no <li> items found inside the ul — skipping."
      );
      return;
    }

    // store animation instances for cleanup
    const createdAnimations: Array<Animation> = [];

    // animate the list horizontal translation
    // translate by (items.length - 1) * 100 vw (e.g. 4 items -> 300vw)
    const totalTranslate = (items.length - 1) * 100;
    const controls = animate(
      ul,
      { transform: ["none", `translateX(-${totalTranslate}vw)`] },
      { easing: spring(), duration: 1.2 }
    );
    createdAnimations.push(controls);

    // attach scroll behaviour to the list animation (use the section ref as target)
    try {
      scroll(controls, { target: section });
    } catch (err) {
      console.warn(
        "HorizontalScroll: error attaching scroll to list animation",
        err
      );
    }

    // animate headers as they enter/leave segments
    const segmentLength = 1 / items.length;

    items.forEach((item, i) => {
      const header = item.querySelector("h2") as HTMLElement | null;
      if (!header) {
        console.warn(
          `HorizontalScroll: no <h2> inside li index ${i}, skipping header animation.`
        );
        return;
      }

      const headerAnim = animate(
        header,
        { x: [800, -800] },
        { duration: 1, easing: "ease-in-out" }
      );
      createdAnimations.push(headerAnim);

      try {
        scroll(headerAnim, {
          target: section,
          offset: [
            [i * segmentLength, 1],
            [(i + 1) * segmentLength, 0],
          ],
        });
      } catch (err) {
        console.warn(
          `HorizontalScroll: error attaching scroll to header index ${i}`,
          err
        );
      }
    });

    // cleanup: stop all animations on unmount
    return () => {
      createdAnimations.forEach((a) => {
        try {
          // Motion One animation instances expose cancel() or finish() depending on runtime.
          // use cancel/stop/finish defensively
          // @ts-ignore
          if (typeof a.cancel === "function") a.cancel();
          // @ts-ignore
          if (typeof a.stop === "function") a.stop();
          // @ts-ignore
          if (typeof a.finish === "function") a.finish();
        } catch (err) {
          // ignore cleanup errors
        }
      });
    };
  }, []);

  return (
    <ReactLenis root>
      <main>
        <article>
          <header className="text-white relative  w-full bg-slate-950  grid place-content-center  h-[80vh]">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            <h1 className="text-6xl font-bold text-center tracking-tight">
              I know You Love to Scroll <br />
              So Scroll
            </h1>
          </header>

          {/* attach sectionRef here so we can reliably target it */}
          <section ref={sectionRef} className="h-[500vh] relative">
            <ul ref={ulRef} className="flex sticky top-0">
              <li className="h-screen w-screen bg-red-400 flex flex-col justify-center overflow-hidden  items-center">
                <h2 className="text-[20vw] font-semibold relative bottom-5 inline-block text-black">
                  PASSION
                </h2>
                <Image
                  src="https://res.cloudinary.com/dzl9yxixg/image/upload/v1713532202/ui-layout/team_gsu8ej.png"
                  className="2xl:w-[550px] w-[380px] absolute bottom-0"
                  width={500}
                  height={500}
                  alt="image"
                />
              </li>

              <li className="h-screen w-screen bg-blue-400 flex flex-col justify-center overflow-hidden  items-center">
                <h2 className="text-[20vw] font-semibold relative bottom-5 inline-block text-black">
                  WORK
                </h2>
                <Image
                  src="https://res.cloudinary.com/dzl9yxixg/image/upload/v1713532202/ui-layout/team_gsu8ej.png"
                  className="2xl:w-[550px] w-[380px] absolute bottom-0"
                  width={500}
                  height={500}
                  alt="image"
                />
              </li>

              <li className="h-screen w-screen bg-orange-400 flex flex-col justify-center overflow-hidden  items-center">
                <h2 className="text-[20vw] font-semibold relative bottom-5 inline-block text-black">
                  MOTIVATION
                </h2>
                <Image
                  src="https://res.cloudinary.com/dzl9yxixg/image/upload/v1713532202/ui-layout/team_gsu8ej.png"
                  className="2xl:w-[550px] w-[380px] absolute bottom-0"
                  width={500}
                  height={500}
                  alt="image"
                />
              </li>

              <li className="h-screen w-screen bg-yellow-400 flex flex-col justify-center overflow-hidden  items-center">
                <h2 className="text-[20vw] font-semibold relative bottom-5 inline-block text-black">
                  INSPIRATION
                </h2>
                <Image
                  src="https://res.cloudinary.com/dzl9yxixg/image/upload/v1713532202/ui-layout/team_gsu8ej.png"
                  className="2xl:w-[550px] w-[380px] absolute bottom-0"
                  width={500}
                  height={500}
                  alt="image"
                />
              </li>

              <li className="h-screen w-screen bg-green-400 flex flex-col justify-center overflow-hidden  items-center">
                <h2 className="text-[20vw] font-semibold relative bottom-5 inline-block text-black">
                  BELIVE
                </h2>
                <Image
                  src="https://res.cloudinary.com/dzl9yxixg/image/upload/v1713532202/ui-layout/team_gsu8ej.png"
                  className="2xl:w-[550px] w-[380px] absolute bottom-0"
                  width={500}
                  height={500}
                  alt="image"
                />
              </li>
            </ul>
          </section>

          <footer className="bg-red-600 text-white grid place-content-center h-[80vh]">
            <p>
              Created By{" "}
              <a
                target="_blank"
                href="https://twitter.com/mattgperry"
                rel="noreferrer"
              >
                Matt Perry
              </a>
            </p>
          </footer>
        </article>

        <div className="progress fixed left-0 right-0  h-2 rounded-full bg-red-600 bottom-[50px] scale-x-0"></div>
      </main>
    </ReactLenis>
  );
}
