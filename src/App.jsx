import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Component'lerin
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Certificates from "./pages/Certificates";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";

// YENİ: Kendi hook'umuzu import ediyoruz
import { useAssetLoader } from "./hooks/useAssetLoader";

// --- YENİ: Tüm kritik asset'leri buraya import et ---
// 1. Ana Resimler
import heroImage from "./assets/images/image.png";
import logo from "./assets/images/logo.svg"; // Logo'nun yolunu kontrol et, sanırım buydu

// 2. Proje Resimleri (projectsData'dan)
import project1 from "./assets/images/project1.png";
import project2 from "./assets/images/project2.png";
import project4 from "./assets/images/project4.png";

// 3. Sertifika Resimleri (certificatesData'dan)
import sertifika1 from "./assets/images/sertifika1.png";
import sertifika2 from "./assets/images/sertifika2.png";
// --- Bitiş: Asset importları ---

// --- YENİ: Takip edilecek asset listeleri ---
const fontAssets = [
  "400 1em Inter", // index.css'ten
  "500 1em Inter", // index.css'ten
  "500 1em Syne", // index.css'ten
  "600 1em Syne", // index.css'ten
  "700 1em Syne", // index.css'ten
];

const imageAssets = [
  heroImage,
  logo,
  project1,
  project2,
  project4,
  sertifika1,
  sertifika2,
];
// --- Bitiş: Asset listeleri ---

const App = () => {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  // YENİ: Gerçek progress'i hook'umuzdan alıyoruz
  const progress = useAssetLoader(fontAssets, imageAssets);

  // Global smooth scroll with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false, // Mobilde native scroll kullan
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GSAP ScrollTrigger ile entegrasyon
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Bu fonksiyon aynı kalıyor, çünkü bu hâlâ lazım.
  const handleLoadingFinished = () => {
    setShowLoadingScreen(false);
  };

  if (showLoadingScreen) {
    return (
      <div style={{ cursor: "none" }}>
        <LoadingScreen
          progress={progress} // Gerçek progress'i yolla
          onFinished={handleLoadingFinished}
        />
      </div>
    );
  }

  // Sitenin kendisi (değişiklik yok)
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
