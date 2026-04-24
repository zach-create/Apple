function Logo({ light = false }) {
  return (
    <div className={`brand-lockup ${light ? 'light' : ''}`}>
      <div className="brand-icon" aria-hidden="true">
        <svg viewBox="0 0 70 42" role="presentation">
          <path
            d="M18 16c-4-8-14-8-16 3-2 10 4 18 12 20 8 2 16-4 17-12 1-7-3-11-8-11-2 0-4 0-5 0Z"
            fill="currentColor"
          />
          <path
            d="M17 9c3-5 8-7 12-7-1 4-3 8-9 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M47 13c7-4 15 0 18 8 3 9-2 18-11 20-10 2-18-3-20-11-2-7 4-15 13-17Z"
            fill="currentColor"
            opacity="0.78"
          />
          <path
            d="M46 10c3-5 7-8 12-9-1 5-4 8-9 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <span>Apple &amp; Peaches</span>
    </div>
  );
}

export default Logo;
