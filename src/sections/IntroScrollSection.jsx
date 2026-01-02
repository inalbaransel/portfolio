

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const IntroScrollSection = () => {


  // Refs for the boxes and text
  const vancouverRef = useRef(null);
  const builderRef = useRef(null);
  const engineRef = useRef(null);
  const ampersandRef = useRef(null);
  const introTextRef = useRef(null);
  const secondTextRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const vancouverBox = vancouverRef.current;
    const builderBox = builderRef.current;
    const engineBox = engineRef.current;
    const ampersand = ampersandRef.current;
    const introText = introTextRef.current;
    const secondText = secondTextRef.current;

    // Başlangıçta tüm elemanları sıfırla
    const resetElements = () => {
      gsap.set(vancouverBox, { scaleY: 0, opacity: 0, transformOrigin: 'top center' });
      gsap.set(builderBox, { scaleX: 0, opacity: 0, transformOrigin: 'center' });
      gsap.set(engineBox, { scaleX: 0, opacity: 0, transformOrigin: 'center' });
      gsap.set(ampersand, { scale: 0.6, opacity: 0, transformOrigin: 'center' });
      gsap.set(introText.querySelectorAll('.color-animate'), { color: '#e5dac7' });
      gsap.set(secondText.querySelectorAll('.color-animate'), { color: '#e5dac7' });
    };

    resetElements();

    // === DEĞİŞİKLİK BURADA BAŞLIYOR ===
    // İki metin animasyonunu (introTl ve secondTl) tek bir timeline'da birleştirdik.

    // Önce kelime sayılarını alalım (animasyon zamanlaması için)
    const introWords = introText.querySelectorAll('.color-animate');
    const introWordCount = introWords.length;

    // İlk animasyonun ne zaman biteceğini hesaplayalım
    // (son kelimenin başlangıç zamanı) + (kendi animasyon süresi)
    const firstAnimEndTime = (introWordCount - 1) * 0.2 + 0.3;

    // Tek, birleşik timeline oluştur
    const textMasterTl = gsap.timeline({
      scrollTrigger: {
        trigger: introText, // Tetikleyici ilk metin olsun
        start: 'top 70%',   // Orijinal başlangıcı koru
        end: 'bottom 30%', // İki animasyona da yetecek kadar scroll alanı ver
        scrub: 0.5,
        toggleActions: 'play none reverse none',
        onReverseComplete: resetElements
      }
    });

    // 1. Animasyonu (ilk cümle) master timeline'a ekle
    introWords.forEach((word, index) => {
      textMasterTl.to(word, {
        color: '#2F86F7',
        duration: 0.3,
        ease: 'power1.inOut'
      }, index * 0.2); // Göreceli 'stagger' başlangıcı (0, 0.2, 0.4...)
    });

    // 2. Animasyonu (ikinci cümle) master timeline'a ekle
    secondText.querySelectorAll('.color-animate').forEach((word, index) => {
      textMasterTl.to(word, {
        color: '#2F86F7',
        duration: 0.3,
        ease: 'power1.inOut'
      }, 
      firstAnimEndTime + (index * 0.2) // İLK animasyon bittikten SONRA başla
      ); 
    });
    
    // === DEĞİŞİKLİK BURADA BİTİYOR ===
    // (Eski introTl ve secondTl kodları artık yok)


    // İstanbul kutusu animasyonu (BU KOD AYNI KALDI)
    const istanbulTl = gsap.timeline({
      scrollTrigger: {
        trigger: vancouverBox,
        start: 'top 60%',
        end: 'center 40%',
        scrub: 0.5,
        toggleActions: 'play none reverse none'
      }
    });

    istanbulTl
      .to(vancouverBox, {
        scaleY: 1,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out'
      });

    // Builder & Engine animasyonu (BU KOD AYNI KALDI)
    const builderEngineTl = gsap.timeline({
      scrollTrigger: {
        trigger: builderRef.current,
        start: 'top 70%',
        end: 'center 30%',
        scrub: 0.5,
        toggleActions: 'play none reverse none'
      }
    });

    builderEngineTl
      .to(builderBox, {
        scaleX: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
      })
      .to(ampersand, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
      }, '-=0.3')
      .to(engineBox, {
        scaleX: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.3');

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
  return (
    <>
      <style>{`
        .vancouver-box, .impactful-stack {
          will-change: transform, opacity;
        }
        .builder-engine-stack {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          margin-left: 8px;
          position: relative;
        }
        .ampersand-big {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) scale(1);
          color: #e5dac7;
          font-size: 1.7em;
          font-weight: 900;
          z-index: 2;
          pointer-events: none;
          line-height: 1;
          text-shadow: 0 2px 12px #111a, 0 1px 0 #fff2;
          opacity: 1;
          transition: opacity 0.3s, transform 0.3s;
        }
        .builder-box, .engine-box {
          will-change: transform, opacity;
          display: block;
          background: #e5dac7;
          border-radius: 32px;
          padding: 0;
          margin: 0;
          min-width: 120px;
        }
        .builder-box span, .engine-box span {
          color: #222;
          font-weight: 800;
          font-size: 1.1em;
          font-family: inherit;
          background: transparent;
          padding: 0.5em 1.2em;
          display: block;
          text-align: center;
        }
      `}</style>
      <section
        className="w-full flex justify-center items-center py-24 px-4"
        style={{ background: '#111', minHeight: '60vh' }}
      >
        <div className="max-w-4xl w-full">
          <h2
            ref={introTextRef}
            className="intro-1 text-[2.2rem] md:text-[3rem] font-extrabold leading-tight mb-2"
            style={{ letterSpacing: '-0.01em', color: '#e5dac7', display: 'flex', flexWrap: 'wrap', alignItems: 'center', whiteSpace: 'pre-line' }}
          >
            <span role="img" aria-label="wave" className="color-animate">👋</span>{' '}
            {"Pleased to meet ya, I'm a computer engineer based in".split(' ').map((word, i) => (
              <span key={i} className="color-animate" style={{ transition: 'color 0.3s', marginRight: '0.25em' }}>{word}</span>
            ))}
            <span
              ref={vancouverRef}
              className="vancouver-box inline-block px-4 py-2 rotate-[-3deg] ml-2 mb-1"
              style={{ color: '#080707', fontFamily: 'inherit', fontWeight: 800, fontSize: '1.2em', background: '#e5dac7', borderRadius: 32, opacity: 1, transformOrigin: 'left center', display: 'inline-block' }}
              data-animated="false"
            >
              ISTANBUL, TURKEY
            </span>
          </h2>
          <h2
            ref={secondTextRef}
            className="intro-2 text-[2.2rem] md:text-[3rem] font-extrabold leading-tight mb-2"
            style={{ letterSpacing: '-0.01em', color: '#e5dac7', whiteSpace: 'pre-line' }}
          >
            {"I handle the full stack, but I'm most passionate about creating high-impact, revenue-driving interfaces".split(' ').map((word, i) => (
              <span key={i} className="color-animate" style={{ transition: 'color 0.3s' }}> {word}</span>
            ))}
          </h2>
          <h2
            className="intro-3 text-[2.2rem] md:text-[3rem] font-extrabold leading-tight mt-2"
            style={{ letterSpacing: '-0.01em', color: '#e5dac7', display: 'inline-block', whiteSpace: 'pre-line' }}
          >
            <span style={{ color: '#e5dac7' }}> </span>
            <div className="builder-engine-stack">
              <span
                ref={builderRef}
                className="builder-box"
                style={{ opacity: 1, transformOrigin: 'center' }}
                data-animated="false"
              >
                <span>BUILDER</span>
              </span>
              <span ref={ampersandRef} className="ampersand-big">&amp;</span>
              <span
                ref={engineRef}
                className="engine-box"
                style={{ opacity: 1, transformOrigin: 'center' }}
                data-animated="false"
              >
                <span>ENGINE</span>
              </span>
            </div>
          </h2>
        </div>
      </section>
    </>
  );
};

export default IntroScrollSection;
