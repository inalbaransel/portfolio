import React, { useEffect, useRef, useState } from 'react';

// isMobile fonksiyonu (Değişiklik yok)
const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
};

// useMinTimeProgress custom hook (Değişiklik yok)
const useMinTimeProgress = (duration = 3000) => {
  const [minTimeProgress, setMinTimeProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    let frameId;
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, (elapsed / duration) * 100);
      setMinTimeProgress(progress);
      if (progress < 100) {
        frameId = requestAnimationFrame(animate);
      }
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [duration]);

  return minTimeProgress;
};


// === LoadingScreen Component'i (Değişiklikler burada) ===
const LoadingScreen = ({ progress: actualProgress = 0, onFinished }) => {
  
  const [mobile, setMobile] = useState(false);
  const circleRef = useRef(null);
  const minTimeProgress = useMinTimeProgress(5000); // 3sn timer
  const displayProgress = Math.min(actualProgress, minTimeProgress);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    setMobile(isMobile());
  }, []);

  // Circle animasyon effect'i (Değişiklik yok)
  useEffect(() => {
    if (circleRef.current) {
      const radius = 32;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (displayProgress / 100) * circumference;
      circleRef.current.style.strokeDashoffset = offset;
    }
  }, [displayProgress]);

  // Fade-out effect'i (Değişiklik yok)
  useEffect(() => {
    if (displayProgress === 100) {
      setIsFading(true); 
      const fadeTimer = setTimeout(() => {
        if (onFinished) {
          onFinished();
        }
      }, 500); // CSS transition süresi
      return () => clearTimeout(fadeTimer);
    }
  }, [displayProgress, onFinished]);

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 9999,
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#111',
        display: 'flex',
        alignItems: 'center', // Dikeyde ortala (Bu hep kalsın)
        
        // YENİ: Mobilde sola yasla, PC'de ortala
        justifyContent: mobile ? 'flex-start' : 'center', 
        
        // YENİ: Mobilde sola yaslayınca kenara yapışmasın, SS'teki gibi boşluk olsun
        paddingLeft: mobile ? '8vw' : '0',

        pointerEvents: 'all',
        transition: 'opacity 0.5s ease-out',
        opacity: isFading ? 0 : 1,
      }}
    >
      {/* Desktop: (Değişiklik yok) */}
      {!mobile ? (
        <CursorLoader progress={displayProgress} />
      ) : (
        // Mobile: 
        // YENİ: Bu iç div'in 'alignItems' ayarını 'flex-start' yaptık.
        // Artık daire ve altındaki % yazısı da sola yaslanacak.
        <div style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            alignItems: 'flex-start' // 'center' idi, 'flex-start' oldu
        }}>
          <svg width={80} height={80}>
            <circle
              cx={40}
              cy={40}
              r={32}
              fill="none"
              stroke="#800020"
              strokeWidth={7}
              strokeDasharray={2 * Math.PI * 32}
              strokeDashoffset={2 * Math.PI * 32}
              ref={circleRef}
              style={{ transition: 'stroke-dashoffset 0.2s' }}
            />
          </svg>
          {/* Yüzde gösterimi burada, "Loading..." değil */}
          <div style={{ 
              color: '#fff', 
              fontSize: 22, 
              marginTop: 16,
              marginLeft: 16,
              fontWeight: 600 
          }}>
            {Math.round(displayProgress)}%
          </div>
        </div>
      )}
    </div>
  );
};


// === Desktop CursorLoader (Değişiklik yok) ===
const CursorLoader = ({ progress }) => {
  const loaderRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (loaderRef.current) {
        loaderRef.current.style.left = `${e.clientX}px`;
        loaderRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  useEffect(() => {
    if (circleRef.current) {
      const radius = 32;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (progress / 100) * circumference;
      circleRef.current.style.strokeDashoffset = offset;
    }
  }, [progress]);

  return (
    <div
      ref={loaderRef}
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 10000,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <svg width={80} height={80}>
        <circle
          cx={40}
          cy={40}
          r={32}
          fill="none"
          stroke="#800020"
          strokeWidth={7}
          strokeDasharray={2 * Math.PI * 32}
          strokeDashoffset={2 * Math.PI * 32}
          ref={circleRef}
          style={{ transition: 'stroke-dashoffset 0.2s' }}
        />
      </svg>
      <div style={{ color: '#fff', fontSize: 22, marginTop: 16, fontWeight: 600, textAlign: 'center' }}>
        {Math.round(progress)}%
      </div>
    </div>
  );
};

export default LoadingScreen;