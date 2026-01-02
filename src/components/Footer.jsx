import React from 'react'
import Logo from '../assets/images/logo.svg'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      {/* Divider */}
      <div className='max-w-[1500px] m-auto h-[1px] bg-white opacity-10'></div>
      
      {/* Footer Top */}
      <footer className="main-container grid md:grid-cols-2 lg:grid-cols-4 gap-10 py-20">
        <Link to='/'>
          <img src={Logo} alt="Logo" className='h-30 w-auto' />
        </Link>
        <div>
          <h5 className='font-medium mb-5'>Services</h5>
          <ul className='flex flex-col gap-2 text-base lg:text-lg'>
            <li>Web Development</li>
            <li>Web Design</li>
            <li>UI / UX</li>
            <li>Branding</li>
          </ul>
        </div>
        <div>
          <h5 className='font-medium mb-5'>Accessibility</h5>
          <ul className='flex flex-col gap-2 text-base lg:text-lg'>
            <li>Mon - Fri: 8:00 - 9:00</li>
            <li>24/7 WhatsApp & Email</li>
          </ul>
          {/* Animated Istanbul Clock */}
          <div className="mt-6 flex flex-col items-start">
            <span className="font-semibold mb-1">Istanbul Time</span>
            <AnimatedClock />
          </div>
        </div>
        <div>
          <h5 className='font-medium mb-5'>Contact</h5>
          <ul className='flex flex-col gap-2 text-base lg:text-lg'>
            <li>baranselinal@hotmail.com</li>
            
          </ul>
        </div>
      </footer>

      {/* Divider */}
      <div className='max-w-[1500px] m-auto h-[1px] bg-white opacity-10'></div>

      {/* Footer Bottom */}
      <div className='main-container grid md:grid-cols-2 gap-3 py-6 lg:py-8 max-md:text-center'>
        <div className='text-base lg:text-lg'>© 2025 Crafted By Baransel | All rights reserved. Stealing is bad karma.</div>
        <div className='flex gap-3 justify-center md:justify-end'>
          <a href="https://www.linkedin.com/in/inalbaransel/" className="hover:opacity-75 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a href="https://www.instagram.com/inalbaransel/" className="hover:opacity-75 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a href="https://github.com/inalbaransel" className="hover:opacity-75 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </a>
        </div>
      </div>
    </>
  )
}

export default Footer

// AnimatedClock component
import { useEffect, useRef, useState } from 'react';

function AnimatedClock() {
  const [time, setTime] = useState(new Date());
  const requestRef = useRef();

  useEffect(() => {
    // Istanbul is UTC+3
    function getIstanbulTime() {
      const now = new Date();
      // Get UTC time, then add 3 hours
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      return new Date(utc + 3 * 60 * 60 * 1000);
    }
    function animate() {
      setTime(getIstanbulTime());
      requestRef.current = requestAnimationFrame(animate);
    }
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  // Calculate angles
  const sec = time.getSeconds();
  const min = time.getMinutes();
  const hour = time.getHours();
  const secAngle = sec * 6;
  const minAngle = min * 6 + sec * 0.1;
  const hourAngle = ((hour % 12) + min / 60) * 30;

  // Digital time string
  const digital = time.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="flex items-center gap-4">
      <svg width="54" height="54" viewBox="0 0 54 54" className="animate-fade-in" style={{minWidth:'54px'}}>
        <circle cx="27" cy="27" r="25" fill="#fff" fillOpacity="0.08" stroke="#fff" strokeWidth="2" />
        {/* Hour hand */}
        <line x1="27" y1="27" x2={27 + 12 * Math.sin(Math.PI * hourAngle / 180)} y2={27 - 12 * Math.cos(Math.PI * hourAngle / 180)} stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        {/* Minute hand */}
        <line x1="27" y1="27" x2={27 + 18 * Math.sin(Math.PI * minAngle / 180)} y2={27 - 18 * Math.cos(Math.PI * minAngle / 180)} stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        {/* Second hand */}
        <line x1="27" y1="27" x2={27 + 20 * Math.sin(Math.PI * secAngle / 180)} y2={27 - 20 * Math.cos(Math.PI * secAngle / 180)} stroke="#e11d48" strokeWidth="1.5" strokeLinecap="round" />
        {/* Center dot */}
        <circle cx="27" cy="27" r="2.5" fill="#e11d48" />
      </svg>
      <span className="font-mono text-lg tracking-widest animate-fade-in" style={{minWidth:'90px'}}>{digital}</span>
    </div>
  );
}