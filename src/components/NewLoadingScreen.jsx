import React from 'react';

const NewLoadingScreen = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#171717',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      {/* Loading animasyonu */}
      <div className="loading-animation">
        <div className="circle"></div>
      </div>

      {/* Yükleniyor yazısı */}
      <div 
        style={{
          color: '#e5dac7',
          marginTop: '20px',
          fontSize: '18px',
          letterSpacing: '3px',
          fontWeight: '500'
        }}
      >
        YÜKLENİYOR
      </div>

      {/* CSS Animasyonları */}
      <style jsx>{`
        .loading-animation {
          width: 48px;
          height: 48px;
          position: relative;
        }

        .circle {
          position: absolute;
          width: 48px;
          height: 48px;
          border: 4px solid #2E54D1;
          border-radius: 50%;
          animation: rotate 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
          border-color: #2E54D1 transparent #2E54D1 transparent;
        }

        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default NewLoadingScreen;