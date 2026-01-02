import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);
  const containerRef = useRef(null);

  // Keywords to highlight with colored backgrounds
  const keywords = [
    "technical",
    "excellence",
    "clean",
    "scalable",
    "high-performing",
    "production-ready",
    "engine",
    "business",
    "complex",
    "payment",
    "database",
    "Firebase",
    "ecommerce",
    "beautiful",
    "efficiently",
    "converts",
    "scales",
    "reliability",
    "tangible",
    "real-world",
  ];

  const wordHighlightBgColor = "60, 60, 60";

  useGSAP(
    () => {
      const paragraph = containerRef.current.querySelector(".anime-text p");
      if (!paragraph) return;

      const text = paragraph.textContent;
      const textWords = text.split(/\s+/);
      paragraph.innerHTML = "";

      // Create word elements
      textWords.forEach((word) => {
        if (word.trim()) {
          const wordContainer = document.createElement("div");
          wordContainer.className = "word inline-block relative";
          wordContainer.style.marginRight = "0.2rem";
          wordContainer.style.marginBottom = "0.2rem";
          wordContainer.style.padding = "0.1rem 0.2rem";
          wordContainer.style.borderRadius = "2rem";
          wordContainer.style.willChange = "background-color, opacity";

          const wordText = document.createElement("span");
          wordText.textContent = word;
          wordText.className = "relative";

          const normalizedWord = word.toLowerCase().replace(/[.,!?;:"()]/g, "");
          if (keywords.includes(normalizedWord)) {
            wordContainer.classList.add("keyword-wrapper");
            wordText.classList.add("keyword", normalizedWord);
            wordText.style.color = "#000";
            wordText.style.position = "relative";
            wordText.style.zIndex = "1";

            // Add colored background for keywords
            const bg = document.createElement("span");
            bg.className =
              "keyword-bg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%+0.5rem)] h-[calc(100%+0.25rem)] rounded-full -z-10";

            // Assign colors based on keyword groups
            if (
              ["technical", "scalable", "database"].includes(normalizedWord)
            ) {
              bg.style.backgroundColor = "#7a78ff";
            } else if (
              ["excellence", "beautiful", "efficiently"].includes(
                normalizedWord
              )
            ) {
              bg.style.backgroundColor = "#fe6d38";
            } else {
              bg.style.backgroundColor = "#c6fe69";
            }

            wordText.appendChild(bg);
          }

          wordContainer.appendChild(wordText);
          paragraph.appendChild(wordContainer);
        }
      });

      // Create scroll animation
      const wordElements = Array.from(
        containerRef.current.querySelectorAll(".anime-text .word")
      );
      const totalWords = wordElements.length;

      // Set initial opacity to 0
      wordElements.forEach((word) => {
        word.style.opacity = "0";
        const span = word.querySelector("span");
        if (span) span.style.opacity = "0";
      });

      ScrollTrigger.create({
        trigger: aboutRef.current,
        pin: aboutRef.current,
        start: "top top",
        end: `+=${window.innerHeight * 2}`, // 4x'ten 2x'e düşürdük
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;

          wordElements.forEach((word, index) => {
            const wordText = word.querySelector("span");

            if (progress <= 0.7) {
              // Reveal phase
              const progressTarget = 0.7;
              const revealProgress = Math.min(1, progress / progressTarget);

              const overlapWords = 15;
              const totalAnimationLength = 1 + overlapWords / totalWords;

              const wordStart = index / totalWords;
              const wordEnd = wordStart + overlapWords / totalWords;

              const timelineScale =
                1 /
                Math.min(
                  totalAnimationLength,
                  1 + (totalWords - 1) / totalWords + overlapWords / totalWords
                );

              const adjustedStart = wordStart * timelineScale;
              const adjustedEnd = wordEnd * timelineScale;
              const duration = adjustedEnd - adjustedStart;

              const wordProgress =
                revealProgress <= adjustedStart
                  ? 0
                  : revealProgress >= adjustedEnd
                  ? 1
                  : (revealProgress - adjustedStart) / duration;

              word.style.opacity = wordProgress;

              const backgroundFadeStart =
                wordProgress >= 0.9 ? (wordProgress - 0.9) / 0.1 : 0;
              const backgroundOpacity = Math.max(0, 1 - backgroundFadeStart);
              word.style.backgroundColor = `rgba(${wordHighlightBgColor}, ${backgroundOpacity})`;

              const textRevealThreshold = 0.9;
              const textRevealProgress =
                wordProgress >= textRevealThreshold
                  ? (wordProgress - textRevealThreshold) /
                    (1 - textRevealThreshold)
                  : 0;
              wordText.style.opacity = Math.pow(textRevealProgress, 0.5);
            } else {
              // Reverse phase
              const reverseProgress = (progress - 0.7) / 0.3;
              word.style.opacity = 1;
              const targetTextOpacity = 1;

              const reverseOverlapWords = 5;
              const reverseWordStart = index / totalWords;
              const reverseWordEnd =
                reverseWordStart + reverseOverlapWords / totalWords;

              const reverseTimelineScale =
                1 /
                Math.max(
                  1,
                  (totalWords - 1) / totalWords +
                    reverseOverlapWords / totalWords
                );

              const reverseAdjustedStart =
                reverseWordStart * reverseTimelineScale;
              const reverseAdjustedEnd = reverseWordEnd * reverseTimelineScale;
              const reverseDuration = reverseAdjustedEnd - reverseAdjustedStart;

              const reverseWordProgress =
                reverseProgress <= reverseAdjustedStart
                  ? 0
                  : reverseProgress >= reverseAdjustedEnd
                  ? 1
                  : (reverseProgress - reverseAdjustedStart) / reverseDuration;

              if (reverseWordProgress > 0) {
                wordText.style.opacity =
                  targetTextOpacity * (1 - reverseWordProgress);
                word.style.backgroundColor = `rgba(${wordHighlightBgColor}, ${reverseWordProgress})`;
              } else {
                wordText.style.opacity = targetTextOpacity;
                word.style.backgroundColor = `rgba(${wordHighlightBgColor}, 0)`;
              }
            }
          });
        },
      });
    },
    { scope: aboutRef, dependencies: [] }
  );

  return (
    <>
      <div
        ref={aboutRef}
        className="h-screen bg-[#141414] relative z-10 overflow-hidden p-4 md:p-8 -mt-1"
      >
        <div
          ref={containerRef}
          className="w-full h-full flex justify-center items-center border-0 md:border-[0.15rem] border-dashed border-[rgb(60,60,60)] rounded-[1rem] md:rounded-[2rem] px-4 md:px-0"
        >
          <div className="anime-text w-full max-w-[95%] md:max-w-[85%] lg:max-w-[60%]">
            <p className="text-white text-center mb-4 md:mb-8 text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-black leading-snug md:leading-tight">
              My focus is on technical excellence, not aesthetic trends. My
              approach combines a clean, scalable code architecture with
              seamless functionality to ensure every project is high-performing
              and production-ready. My priority is building the engine under the
              hood—an approach that truly drives business outcomes by
              implementing complex features like payment systems and database
              logic (Firebase). Whether I'm building an ecommerce platform or
              designing a brand presence, I focus on creating work that not only
              looks beautiful, but also performs efficiently, converts, and
              scales seamlessly. My success is measured by the technical
              reliability and tangible, real-world results my software delivers.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
