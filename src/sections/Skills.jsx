import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);

  // Güncellenmiş ve kategorilere ayrılmış yetenek listesi
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        {
          name: "JavaScript",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        },
        {
          name: "TypeScript",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        },
        {
          name: "Python",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        },
        { name: "C", icon: "https://cdn.simpleicons.org/c/00589D" },
        {
          name: "C#",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
        },
        { name: "C++", icon: "https://cdn.simpleicons.org/cplusplus/00599C" },
      ],
    },
    {
      title: "Frontend Tools",
      skills: [
        {
          name: "React",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        },
        {
          name: "Tailwind CSS",
          icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
        },
        {
          name: "Capacitor",
          icon: "https://cdn.simpleicons.org/capacitor/119EFF",
        },
      ],
    },
    {
      title: "Backend & Cloud",
      skills: [
        {
          name: "Firebase",
          icon: "https://cdn.simpleicons.org/firebase/FFCA28",
        },
      ],
    },
    {
      title: "Design Tools",
      skills: [
        {
          name: "Figma",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
        },
      ],
    },
    {
      title: "Animation Libraries",
      skills: [
        { name: "GSAP", icon: "https://cdn.simpleicons.org/gsap/0AE448" },
      ],
    },
    // YENİ DİL KATEGORİSİ BURADA
    {
      title: "Languages",
      skills: [
        {
          name: "Turkish",
          icon: "https://flagsapi.com/TR/flat/24.png",
        },
        {
          name: "English",
          icon: "https://flagsapi.com/GB/flat/24.png",
        },
      ],
    },
  ];

  // --- useEffect ve return kısmının geri kalanı aynı kalıyor ---

  useEffect(() => {
    const section = sectionRef.current;
    const skillTags = section.querySelectorAll(".skill-tag");

    // Başlık animasyonu (Aynı kaldı)
    gsap.fromTo(
      section.querySelector(".section-title"),
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top center+=100",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Her bir skill tag'i için animasyon (Aynı kaldı)
    skillTags.forEach((tag, index) => {
      gsap.fromTo(
        tag,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay: index * 0.05,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: tag,
            start: "top bottom",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-4xl md:text-5xl font-bold text-white mb-2 text-center">
          Skills
        </h2>
        <p className="text-gray-400 mb-16 text-center text-lg">
          Tools and technologies I use
        </p>

        {/* Grid düzenini güncelledim: Dil bloğu için yer açıldı. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, catIdx) => (
            <div
              key={catIdx}
              className="skill-category-block bg-[#1a1a1a] rounded-lg p-6 border border-gray-800 transition-all duration-300 transform hover:shadow-xl hover:border-blue-700/50 min-h-[150px] flex flex-col"
            >
              <h3 className="text-white text-xl font-bold mb-4 whitespace-nowrap">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="skill-tag flex items-center bg-[#282828] text-gray-300 text-sm font-medium px-3 py-1 rounded-full whitespace-nowrap transition-colors duration-200 hover:bg-blue-600 hover:text-white cursor-pointer"
                  >
                    {/* img etiketini sadece URL varsa render ediyoruz */}
                    {skill.icon && skill.icon.startsWith("http") ? (
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-4 h-4 mr-2"
                      />
                    ) : skill.icon ? (
                      <span
                        role="img"
                        aria-label={skill.name}
                        className="w-4 h-4 mr-2"
                      >
                        {skill.icon}
                      </span>
                    ) : null}

                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
