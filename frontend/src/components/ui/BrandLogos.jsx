import React from "react";

/**
 * A collection of inline SVG logos for top AC brands.
 * This ensures logos always load even if external images are blocked.
 */
const BrandLogos = {
  Daikin: ({ className }) => (
    <svg viewBox="0 0 100 24" className={className} fill="currentColor">
      <path d="M7.4 0H0v23.5h7.5c6.2 0 10.4-3.5 10.4-11.7C17.9 3.5 13.6 0 7.4 0zm0 18.5H5v-14h2.4c3.2 0 5.1 1.6 5.1 7s-1.9 7-5.1 7zM30.4 0l-9.8 23.5h5.3l1.8-4.7h10.4l1.8 4.7h5.3L35.4 0h-5zm-1.6 14.5l3.4-8.8 3.4 8.8h-6.8zM50.4 0v23.5h5.3V0h-5.3zM70.4 0v10.5L61.4 0h-5.8v23.5h5.3v-10.5l9 10.5h5.8V0h-5.3zM92.4 12.5l-8.4-12.5h-5.8v23.5h5.3V9.5l8.4 12.5h5.8V0h-5.3v12.5z" />
    </svg>
  ),
  LG: ({ className }) => (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
      <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z" />
      <path d="M70 50H50v-5h15c0-11-9-20-20-20s-20 9-20 20 9 20 20 20c8 0 14-5 18-12l-4-3c-3 5-8 9-14 9-8.3 0-15-6.7-15-15s6.7-15 15-15 15 6.7 15 15v1h10z" />
      <circle cx="35" cy="40" r="5" />
    </svg>
  ),
  Samsung: ({ className }) => (
    <svg viewBox="0 0 100 24" className={className} fill="currentColor">
      <path d="M12.4 8.5c-1.3-.8-2.6-1.5-4-1.5-1.4 0-2.1.6-2.1 1.5 0 .9.7 1.4 2.8 1.9 3.5.8 5.6 1.8 5.6 4.6 0 3.1-2.5 5-6.5 5-2.1 0-4.3-.8-5.8-2l1.6-2.5c1.3 1 3 1.8 4.4 1.8 1.5 0 2.3-.6 2.3-1.6 0-1-.8-1.5-2.9-2-3.4-.8-5.5-1.9-5.5-4.5 0-3.1 2.5-4.8 6.1-4.8 1.9 0 3.7.6 5.1 1.6l-1.1 2.5zm16.5-4.3l7 15.5h-4.3l-1.3-3.2h-7.8l-1.3 3.2H17l7-15.5h4.9zm-2.4 8.8l-2-5-2 5h4zm22.4-8.8l6.8 11.2V4.2h3.9v15.5H55l-6.8-11.2v11.2h-3.9V4.2h5.3zm21.4 0l1.9 6.2 1.9-6.2h5.6V19.7h-3.9v-11l-2.4 7.6h-2.4l-2.4-7.6v11h-3.9V4.2h5.6zm15.7 12.3c1.3.8 2.8 1.4 4.3 1.4 1.7 0 2.4-.7 2.4-1.6 0-1.1-.9-1.5-2.8-2-3.1-.8-5.2-1.7-5.2-4.4 0-3.1 2.3-4.8 5.9-4.8 1.7 0 3.2.5 4.5 1.3l-1.4 2.5c-1.1-.7-2.3-1.1-3.4-1.1-1.3 0-2 .6-2 1.4 0 .9.8 1.3 2.7 1.8 3.1.8 5.2 1.8 5.2 4.6 0 3.3-2.6 5.1-6.6 5.1-2 0-3.9-.7-5.4-1.7l1.7-2.5z" />
    </svg>
  ),
  Hitachi: ({ className }) => (
    <svg viewBox="0 0 100 24" className={className} fill="currentColor">
      <path d="M12.5 0v24h-4.5V14h-8V24h-4.5V0h4.5v10h8V0h4.5zm15 24h-4.5V0h4.5v24zm18.5-19.5H41V24h-4.5V4.5h-5V0h14.5v4.5zm16.5-4.5l8 24h-4.5l-1.5-4.5h-8l-1.5 4.5h-4.5l8-24h4.5zm-1.5 15l-2.5-7.5-2.5 7.5h5zm23.5 1.5l1.5-1.5c1.5 2 4 3 6.5 3 2.5 0 4-1.5 4-3 0-1.5-1-2.5-4-3-4.5-1-8-2-8-6.5S82 0 87 0c3.5 0 6.5 1.5 8.5 4l-1.5 1.5c-1.5-1.5-4-2.5-6.5-2.5-2 0-3.5 1-3.5 2.5 0 1.5 1 2.5 4 3 4.5 1 8.5 2 8.5 6.5s-4 7-8.5 7c-4 0-7.5-1.5-9.5-4.5z" />
    </svg>
  ),
  Panasonic: ({ className }) => (
    <svg viewBox="0 0 100 24" className={className} fill="currentColor">
      <path d="M10 0H0v24h4.5V14H10c4.5 0 7.5-2.5 7.5-7S14.5 0 10 0zm0 9.5H4.5v-5H10c2.5 0 3.5 1 3.5 2.5s-1 2.5-3.5 2.5zm25-9.5l-9.5 24h5l1.5-4.5h9.5l1.5 4.5h5l-9.5-24h-3.5zm-1.5 15l3.5-9 3.5 9h-7zm22-15v24h4.5V10.5l9 13.5h5.5V0h-4.5v13.5L52 0h-5zm28 0l-9.5 24h5l1.5-4.5h9.5l1.5 4.5h5l-9.5-24h-3.5zm-1.5 15l3.5-9 3.5 9h-7z" />
    </svg>
  ),
  Carrier: ({ className }) => (
    <svg viewBox="0 0 100 24" className={className} fill="currentColor">
      <path d="M12.5 24H0V0h12.5v4.5H4.5v5.5H11v4.5H4.5v5h8V24zm18.5 0h-4.5V0h4.5v24zm22.5-19.5H49V24h-4.5V4.5h-5V0h14.5v4.5zm19.5 0h-4.5v19.5h-5V0H73v24h-4.5V4.5zM85 0h15v4.5h-10.5V10h9V14.5h-9V19.5H100V24H85V0z" />
    </svg>
  ),
  Mitsubishi: ({ className }) => (
    <svg viewBox="0 0 100 24" className={className} fill="currentColor">
      <path d="M50 0L37.5 24H62.5L50 0zm-25 0L0 24H25L37.5 0H25zm50 0L62.5 24H100L75 0H75z" />
    </svg>
  ),
  Voltas: ({ className }) => (
    <svg viewBox="0 0 100 24" className={className} fill="currentColor">
      <path d="M22.5 0L12.5 24H0L10 0h12.5zm25 0c6.5 0 11.5 5 11.5 12s-5 12-11.5 12-11.5-5-11.5-12 5-12 11.5-12zm0 19c4 0 7-3 7-7s-3-7-7-7-7 3-7 7 3 7 7 7zm17.5-19v24h12.5v-4.5h-8V0h-4.5zm15 0h14.5v4.5h-10.5V10h9V14.5h-9V19.5h10.5V24H80V0z" />
    </svg>
  ),
  BlueStar: ({ className }) => (
    <svg viewBox="0 0 100 24" className={className} fill="currentColor">
      <path d="M10 0l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6zM35 0v24h-10V0h10zm15 24h-10V0h10v24zm15 0H55V0h10v24zm15 0H75V0h10v24z" />
    </svg>
  )
};

export default BrandLogos;
