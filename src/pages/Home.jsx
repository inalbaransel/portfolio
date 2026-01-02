import React from "react";
import Hero from "../sections/Hero";
import IntroScrollSection from "../sections/IntroScrollSection";
import About from "../sections/About";

import Work from "../sections/Work";
import Education from "../sections/Education";
import WorkExperience from "../sections/WorkExperience";
import Skills from "../sections/Skills";
import Marquee from "../sections/Marquee";
import CTA from "../components/CTA";
import Certificates from "../sections/Certificates";

const Home = () => {
  return (
    <>
      <Hero />
      <IntroScrollSection />
      <About />

      <Work />
      <Education />
      <WorkExperience />
      <Skills />
      <Certificates />
      <Marquee />
      <CTA />
    </>
  );
};

export default Home;
