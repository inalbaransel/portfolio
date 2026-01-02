
import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import heroImg from '../assets/images/image.png';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrambleTextPlugin);

const Hero = () => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const dollarRef = useRef(null);
  const fastRef = useRef(null);
  const profitableRef = useRef(null);
  // YENİ: Mesajın zamanlayıcısı için ref
  const messageTimerRef = useRef(null);
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  useGSAP(() => {
    // Blur overlay effect on scroll
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: '+=100%',
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const blurOverlay = document.getElementById('hero-blur-overlay');
        if (blurOverlay) {
          blurOverlay.style.backdropFilter = `blur(${8 * self.progress}px)`;
          blurOverlay.style.background = `rgba(14,14,14,${0.25 + 0.45 * self.progress})`;
        }
      },
    });

    // Scramble animation for 'Fast' and 'Profitable' on mount
    if (fastRef.current) {
      gsap.fromTo(
        fastRef.current,
        { scrambleText: { text: '', chars: '0123456789abcdefghijklmnopqrstuvwxyz', revealDelay: 0 } },
        {
          scrambleText: {
            text: 'Fast.',
            chars: '0123456789abcdefghijklmnopqrstuvwxyz',
            speed: 0.2,
          },
          duration: 2,
          delay: 0.1,
          ease: 'power1.inOut',
        }
      );
    }
    if (profitableRef.current) {
      gsap.fromTo(
        profitableRef.current,
        { scrambleText: { text: '', chars: '0123456789abcdefghijklmnopqrstuvwxyz', revealDelay: 0 } },
        {
          scrambleText: {
            text: 'Profitable.',
            chars: '0123456789abcdefghijklmnopqrstuvwxyz',
            speed: 0.2,
          },
          duration: 1.8,
          delay: 0.3,
          ease: 'power1.inOut',
        }
      );
    }

    // Animated $$$ below 'Always ahead' (one by one)
    if (dollarRef.current) {
      const animateDollars = () => {
        const el = dollarRef.current;
        // Step 1: show $
        gsap.to(el, { textContent: '$', duration: 0.3, ease: 'power1.inOut', onComplete: () => {
          // Step 2: show $$
          gsap.to(el, { textContent: '$$', duration: 0.3, ease: 'power1.inOut', onComplete: () => {
            // Step 3: show $$$
            gsap.to(el, { textContent: '$$$', duration: 0.3, ease: 'power1.inOut', onComplete: () => {
              // Hold for a moment
              gsap.to(el, { duration: 0.5, onComplete: () => {
                // Step 4: hide to $$
                gsap.to(el, { textContent: '$$', duration: 0.2, ease: 'power1.inOut', onComplete: () => {
                  // Step 5: hide to $
                  gsap.to(el, { textContent: '$', duration: 0.2, ease: 'power1.inOut', onComplete: () => {
                    // Step 6: hide to ''
                    gsap.to(el, { textContent: '', duration: 0.2, ease: 'power1.inOut', onComplete: animateDollars });
                  }});
                }});
              }});
            }});
          }});
        }});
      };
      animateDollars();
    }
  }, { scope: heroRef });


  // YENİ: Pinch-to-zoom engelleme ve uyarı gösterme
  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;

    const handleTouch = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();

        // 1. Her zoom event'inde mesajın GÖRÜNÜR olduğunu garantile
        setIsMessageVisible(true); 
          
        // 2. Eğer çalışan bir sayaç varsa SIFIRLA
        // (Bunu yapmazsak 100 tane sayaç açılır)
        if (messageTimerRef.current) {
          clearTimeout(messageTimerRef.current);
        }

        // 3. Kullanıcı parmağını çekince 1 saniye sonra
        // mesajı gizlemek için YENİ sayaç başlat.
        messageTimerRef.current = setTimeout(() => {
          setIsMessageVisible(false); 
        }, 1000); // 1 saniye 
      }
    };

    heroElement.addEventListener('touchstart', handleTouch, { passive: false });
    heroElement.addEventListener('touchmove', handleTouch, { passive: false });

    return () => {
      heroElement.removeEventListener('touchstart', handleTouch);
      heroElement.removeEventListener('touchmove', handleTouch);
      if (messageTimerRef.current) {
        clearTimeout(messageTimerRef.current);
      }
    };
  }, [isMessageVisible]); // Dependency'i isMessageVisible olarak güncelle// showZoomMessage'ı dependency'e ekle

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden z-0"
      style={{ minHeight: '100vh', background: '#171717' }}
    >
      {/* Fullscreen hero image */}
      <img
        ref={imageRef}
        src={heroImg}
        alt="Baransel Inal"
        className="absolute left-1/2 -translate-x-1/2 select-none"
        style={{
          zIndex: 1,
          height: '130vh',
          width: 'auto',
          minWidth: '100vw',
          objectFit: 'contain',
          objectPosition: 'bottom center',
          background: '#171717',
          bottom: 0,
          left: '50%',
          position: 'absolute',
          transition: 'transform 0.3s cubic-bezier(.4,2,.6,1)',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          WebkitTouchCallout: 'none',
          pointerEvents: 'none'
        }}
        draggable={false}
      />
      {/* Blur overlay - must be after image and before text, with zIndex between image and text */}
      <div
        id="hero-blur-overlay"
        className="absolute w-full h-full left-0 top-0 pointer-events-none"
        style={{
          zIndex: 5,
          backdropFilter: 'blur(0px)',
          WebkitBackdropFilter: 'blur(0px)',
          background: 'rgba(14,14,14,0.25)',
          transition: 'backdrop-filter 0.2s, -webkit-backdrop-filter 0.2s, background 0.2s',
        }}
      />
      {/* Overlay text */}
      <div
  className="absolute left-0 top-0 w-full h-full flex flex-col justify-start px-4 md:px-12"
  style={{ zIndex: 10, pointerEvents: 'none', paddingTop: '26vh' }}
>
        <div className="max-w-4xl mx-auto">
          <div className="text-[3.2rem] xs:text-[2.0rem] sm:text-[4.5rem] md:text-[5rem] lg:text-[6rem] font-heading font-extrabold leading-[1.05] tracking-[-0.02em] select-none drop-shadow-xl" style={{ color: '#e5dac7', textShadow: '0 2px 12px #000b', letterSpacing: '-0.02em', fontWeight: 600 }}>
            <div style={{ color: '#2E54D1' }}><span ref={fastRef}>Fast.</span></div>
            <div>Accurate.</div>
            <div style={{ color: '#2E54D1' }}><span ref={profitableRef}>Profitable.</span></div>
            <div>Always ahead</div>
            <div style={{ height: '1.2em', marginTop: '0.2em' }}>
              <span
                ref={dollarRef}
                className="text-[#2e54d1] inline-block font-extrabold text-[3.5rem] md:text-[5rem] lg:text-[7rem]"
                style={{ fontWeight: 800, letterSpacing: '0.13em', textShadow: '0 2px 16px #000b', color: '#2E54D1' }}
              >
                $$$
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <div className="mouse-container">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
        </div>
        <p className="text-[#e5dac7] mt-4 tracking-[0.2em] text-sm font-medium select-none animate-pulse">
          SCROLL DOWN
        </p>

        <style jsx>{`
          .mouse-container {
            width: 32px;
            padding: 8px 0;
            margin: 0 auto;
          }
          .mouse {
            width: 32px;
            height: 52px;
            border: 2px solid #e5dac7;
            border-radius: 16px;
            position: relative;
          }
          .wheel {
            width: 3px;
            height: 8px;
            border-radius: 2px;
            background-color: #e5dac7;
            position: absolute;
            top: 8px;
            left: 50%;
            transform: translateX(-50%);
            animation: scroll 1.5s ease-in-out infinite;
          }
          @keyframes scroll {
            0% {
              transform: translate(-50%, 0);
              opacity: 1;
            }
            50% {
              transform: translate(-50%, 16px);
              opacity: 0.8;
            }
            100% {
              transform: translate(-50%, 0);
              opacity: 1;
            }
          }
        `}</style>
      </div>

{/* YENİ: Zoom Uyarı Mesajı (Tüm Ekran Blur Efekti) */}
      <div
        // 1. DIŞ KATMAN (Tüm Ekranı Kaplayan Blur Katmanı)
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 99990, // Her şeyin üstünde (yazı hariç)

          // İSTEDİĞİN OLAY BU:
          // Arkadaki tüm siteyi blurla
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          
          // ve hafif karart
          background: 'rgba(0, 0, 0, 0.3)',

          // Görünürlük ve animasyonlar
          opacity: isMessageVisible ? 1 : 0,
          transition: 'opacity 0.5s ease-out, backdrop-filter 0.5s ease-out',

          // Görünmüyorken tıklamaları engellemesin
          pointerEvents: isMessageVisible ? 'auto' : 'none',

          // İçindeki yazı kutusunu ortalamak için:
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* 2. İÇ KATMAN (Net Kalan Yazı Kutusu) */}
        <div
          style={{
            // Bu kutu artık dış katman sayesinde ortalanıyor.
            // Bu yüzden position:fixed, top, left, transform'a gerek kalmadı.
            background: 'rgba(0, 0, 0, 0.7)', // Kendi arka planı
            color: 'white',
            padding: '16px 24px',
            borderRadius: '10px',
            textAlign: 'center',
            fontSize: '1.1rem',
            fontWeight: 600,
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          }}
        >
          Çok inceleme 😉
      </div>
      </div>

    </section>
  );
};

export default Hero;