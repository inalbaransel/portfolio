import React from 'react'
import { Link } from 'react-router-dom'

const isExternal = (url) => /^https?:\/\//.test(url);

const GradientButton = ({ text, link, className = "" }) => {
  if (!link) {
    return (
      <button className={`btn uppercase font-heading border-2 border-transparent text-center min-w-[205px] px-12 py-2 lg:py-3 rounded-full max-sm:text-lg ${className}`}>{text}</button>
    );
  }
  if (isExternal(link)) {
    return (
      <a href={link} className={`btn uppercase font-heading border-2 border-transparent text-center min-w-[205px] px-12 py-2 lg:py-3 rounded-full max-sm:text-lg ${className}`} target="_blank" rel="noopener noreferrer">{text}</a>
    );
  }
  return (
    <Link to={link} className={`btn uppercase font-heading border-2 border-transparent text-center min-w-[205px] px-12 py-2 lg:py-3 rounded-full max-sm:text-lg ${className}`}>{text}</Link>
  );
}

export default GradientButton