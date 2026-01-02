import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

const WorkExperience = () => {
  const sectionRef = useRef(null);
  const svgRef = useRef(null);

  const experiences = [
    {
      position: 'Information Technologies Internship',
      company: 'Social Office',
      period: 'June 23, 2025 - August 5, 2025',
      description: 'I participated in projects involving Python, AutoCAD, Photoshop, and Excel, which allowed me to develop my core programming skills. Through these experiences, I also built a solid foundation in teamwork and project coordination.',
      skills: ['Python', 'Excel', 'AutoCAD', 'Photoshop'],
    },
    {
      position: 'Frontend Developer',
      company: 'Continuous Software',
      period: 'November 25, 2025 - Continuous',
      description: '',
      skills: ['React', 'Next.js', 'Tailwind CSS', 'JavaScript'],
    },


  ];

  useEffect(() => {
    const section = sectionRef.current;
    const items = section.querySelectorAll('.experience-item');
    const progress = section.querySelector('.timeline-progress');
    const dots = section.querySelectorAll('.timeline-dot');

    // Timeline progress animation
    gsap.fromTo(
      progress,
      {
        scaleY: 0,
      },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          scrub: 0.5,
        },
      }
    );

    // Dots and content animation
    items.forEach((item, index) => {
      const dot = dots[index];
      const content = item.querySelector('.content');

      gsap.set(dot, { scale: 0 });
      gsap.set(content, { opacity: 0, x: index % 2 === 0 ? -50 : 50 });

      ScrollTrigger.create({
        trigger: item,
        start: 'top center+=100',
        end: 'top center-=100',
        onEnter: () => {
          gsap.to(dot, { scale: 1, duration: 0.5 });
          gsap.to(content, { opacity: 1, x: 0, duration: 0.5 });
        },
        onLeave: () => {
          gsap.to(dot, { scale: 0.5, duration: 0.5 });
        },
        onEnterBack: () => {
          gsap.to(dot, { scale: 1, duration: 0.5 });
        },
        onLeaveBack: () => {
          gsap.to(dot, { scale: 0, duration: 0.5 });
          gsap.to(content, { opacity: 0, x: index % 2 === 0 ? -50 : 50, duration: 0.5 });
        },
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-16 sm:py-24 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <h2 className="section-title text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-10 sm:mb-16 text-center">
          Work Experience
        </h2>
        <div className="relative">
          <div className="absolute left-1/2 w-1 h-full bg-gray-800 transform -translate-x-1/2"></div>
          <div className="absolute left-1/2 w-1 h-full transform -translate-x-1/2 overflow-hidden">
            <div className="absolute w-full h-full bg-blue-500 origin-top timeline-progress"></div>
          </div>
          <div className="space-y-16 sm:space-y-24">
            {experiences.map((exp, index) => (
              <div key={index} className="experience-item relative">
                <div
                  className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-center ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                >
                  <div
                    className={`content w-full sm:flex-1 ${index % 2 === 0 ? 'sm:pr-12' : 'sm:pl-12'} px-0 sm:px-0 mb-6 sm:mb-0 flex items-center ${index % 2 === 0 ? 'justify-end sm:justify-end' : 'justify-start sm:justify-start'}`}
                  >
                    <div
                      className={`bg-[#1a1a1a]/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-800 hover:border-blue-500 transition-all duration-300 ${index % 2 === 0 ? 'text-right sm:text-right' : 'text-left sm:text-left'}`}
                    >
                      <div className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">{exp.position}</div>
                      <div className="text-blue-400 mb-1">{exp.company}</div>
                      <div className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-4">{exp.period}</div>
                      <p className="text-gray-300 mb-2 sm:mb-4 text-sm sm:text-base">{exp.description}</p>
                      <div
                        className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'justify-end sm:justify-end' : 'justify-start sm:justify-start'}`}
                      >
                        {exp.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-blue-500 rounded-full text-white"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center z-10 mx-auto sm:mx-0">
                    <div className="timeline-dot w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-500 flex items-center justify-center relative">
                      <div className="absolute w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-blue-300 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                  </div>
                  <div className="hidden sm:block flex-1"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;