function Branding() {
  return (
    /* 
      Added border-b, a subtle border-white/20 color, pb-6 for spacing, 
      and px-2 so the line extends just a bit past the text.
    */
    <div className="relative inline-block mt-16 border-b border-white/20 pb-6 px-2">
      <h1 className="font-pixel text-7xl flex items-center gap-10 text-white">
        <span>GitHub</span>
        
        <span className="relative">
          <span className="absolute -top-10 left-3 text-white text-xl font-sans rotate-[8deg] tracking-wide">
            Profile
          </span>
          
          <svg
            className="absolute -top-6.25 -left-8.75 overflow-visible"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
          >
            <path
              d="M 10 45 Q 10 15 40 15"
              stroke="#E2F41D" 
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 30 5 L 42 15 L 30 25"
              stroke="#E2F41D" 
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          
          Analyzer
        </span>
      </h1>
    </div>
  );
}

export default Branding;