export const Castle = ({ className = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="44"
      height="44"
      viewBox="0 0 24 24"
      strokeWidth=".5"
      stroke="black"
      fill="var(--primary-accent)"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <defs>
        {/* <!-- <linearGradient id="grad" gradientTransform="rotate(90)">
    <stop offset="5%"  stop-color="#EA3788" />
    <stop offset="95%" stop-color="#00A7E1" />
  </linearGradient> --> */}
      </defs>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 19v-2a3 3 0 0 0 -6 0v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-14h4v3h3v-3h4v3h3v-3h4v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
      <line stroke="" x1="3" y1="11" x2="21" y2="11" />
    </svg>
  );
};
