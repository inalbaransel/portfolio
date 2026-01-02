import React from 'react'

const Marquee = () => {
  return (
    <>
      <div className="overflow-hidden bg-white text-black pb-28 lg:pb-44">

        {/* Row 1 */}
        <div className="whitespace-nowrap animate-marquee text-6xl lg:text-[7vw] font-heading font-semibold leading-[1] tracking-tight">
          <span className="flex gap-4 lg:gap-8 mx-8">
            CREATE DESIGN TECHNOLOGY CREATE DESIGN TECHNOLOGY
          </span>
        </div>

        {/* Row 2 (reverse) */}
        <div className="whitespace-nowrap animate-marquee-reverse text-6xl lg:text-[7vw] font-heading font-semibold leading-[1] tracking-tight">
          <span className="flex gap-4 lg:gap-8 mx-8">
            CREATE DESIGN TECHNOLOGY CREATE DESIGN TECHNOLOGY
          </span>
        </div>
        
      </div>
    </>
  )
}

export default Marquee