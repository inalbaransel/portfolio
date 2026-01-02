import React from "react";

const Services = () => {
  return (
    <>
      {/* Title Wrapper */}
      <div className="bg-white text-black rounded-tl-[60px] rounded-tr-[60px] relative z-10 -mt-1">
        <div className="main-container pb-12 lg:pb-16 pt-20 lg:pt-24">
          <h3>Services in Detail</h3>
        </div>
      </div>

      {/* Services List */}
      <div className="relative">
        <div className="bg-black text-white pt-16 lg:pt-20 pb-[40rem] sticky top-4">
          <div className="main-container grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-start">
            {/* Left side */}
            <div className="flex gap-6 lg:gap-8">
              <span className="text-gray-400 text-lg lg:text-2xl font-heading tracking-wide block mb-4">
                01
              </span>
              <h2 className="text-[8vw] md:text-6xl font-heading font-bold leading-[1]">
                Web Design <br /> & UI/UX
              </h2>
            </div>

            {/* Right side */}
            <div className="flex items-center">
              <p className="text-lg lg:text-xl leading-relaxed">
                Crafting robust, high-performance applications with clean code
                architecture, rapid load times, and logic that drives flawless
                conversions. Every project is tailored to deliver both technical
                excellence and powerful, seamless functionality.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#E9E9F0] text-black pt-16 lg:pt-20 pb-[23rem] sticky top-1/3">
          <div className="main-container grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-start">
            {/* Left side */}
            <div className="flex gap-6 lg:gap-8">
              <span className="text-gray-400 text-lg lg:text-2xl font-heading tracking-wide block mb-4">
                02
              </span>
              <h2 className="text-[8vw] md:text-6xl font-heading font-bold leading-[1]">
                Backend <br /> Development
              </h2>
            </div>

            {/* Right side */}
            <div className="flex items-center">
              <p className="text-lg lg:text-xl leading-relaxed">
                A robust application needs a robust backend. I design the full
                system architecture, focusing on scalable, secure, and extremely
                fast APIs. I specialize in integrating powerful services for
                payments and establishing reliable data management using
                platforms like Firebase (Firestore). I develop the stable,
                functional engine that ensures your entire application performs
                flawlessly and scales effortlessly.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white text-black py-16 lg:py-20 sticky top-2/3">
          <div className="main-container grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-start">
            {/* Left side */}
            <div className="flex gap-6 lg:gap-8">
              <span className="text-gray-400 text-lg lg:text-2xl font-heading tracking-wide block mb-4">
                03
              </span>
              <h2 className="text-[8vw] md:text-6xl font-heading font-bold leading-[1]">
                Creative <br /> Branding
              </h2>
            </div>

            {/* Right side */}
            <div className="flex items-center">
              <p className="text-lg lg:text-xl leading-relaxed">
                Building high-converting digital presence through clean
                architecture, functional code, and visuals that drive business
                results. From custom templates to full e-commerce systems, I
                focus on creating a scalable and functional online storefront.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
