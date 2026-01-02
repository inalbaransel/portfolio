import React, { useState, useRef } from 'react';
import certificates from '../components/certificatesData.jsx';

// Sticky image cursor for certificate preview
const StickyCertificateCursor = ({ image, description, visible, x, y }) => {
  // Mobilde küçük, büyük ekranda eski boyut
  return (
    <div
      className={`pointer-events-none fixed z-50 transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0'}`}
      style={{
        left: x + 40,
        top: y - 40,
        width: 'min(80vw, 480px)',
        height: 'min(56vw, 340px)',
        maxWidth: 480,
        maxHeight: 340,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <img
        src={image}
        alt="certificate preview"
        className="w-full h-full object-contain rounded-3xl border-4 border-[#7B2FF7] shadow-2xl bg-[#18181b]"
        draggable={false}
        style={{
          width: '100%',
          height: '100%',
          maxWidth: '480px',
          maxHeight: '340px',
        }}
      />
      {description && (
        <div style={{
          background: 'rgba(0,0,0,0.85)',
          color: '#fff',
          borderRadius: '0 0 1.5rem 1.5rem',
          padding: '16px',
          marginTop: '-8px',
          fontSize: '1rem',
          textAlign: 'left',
          maxHeight: '120px',
          overflowY: 'auto',
        }}>
          {description}
        </div>
      )}
    </div>
  );
};


const Certificates = () => {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  // Hide cursor when hovering a certificate name
  const handleMouseMove = (e) => {
    setCursor({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 bg-[#0a0a0a] relative select-none"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-12">
        <div className="flex-1 flex flex-col gap-8 justify-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-14 section-title text-center">
            Certificates
          </h2>
          <ul className="flex flex-col gap-10 items-start w-full">
            {certificates.map((cert, idx) => (
              <li
                key={cert.name}
                className={`text-4xl md:text-6xl font-heading font-bold py-4 rounded-lg transition-colors duration-200 cursor-pointer border-l-8 border-transparent hover:border-[#7B2FF7] hover:bg-[#18181b] relative w-full text-left pl-0 md:pl-0`}
                style={{ color: hoveredIdx === idx ? '#7B2FF7' : '#fff', cursor: hoveredIdx === idx ? 'none' : 'pointer', marginLeft: 0, justifyContent: 'flex-start' }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {cert.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {hoveredIdx !== null && (
        <StickyCertificateCursor
          image={certificates[hoveredIdx].image}
          description={certificates[hoveredIdx].description}
          visible={true}
          x={cursor.x}
          y={cursor.y}
        />
      )}
    </section>
  );
};

export default Certificates;
