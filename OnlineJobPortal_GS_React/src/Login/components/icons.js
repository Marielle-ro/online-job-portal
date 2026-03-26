// export const Icons = {
//     user: (props) => <svg {...props} viewBox="0 0 20 20" fill="currentColor"><circle cx="10" cy="10" r="10" /></svg>,
//     lock: (props) => <svg {...props} viewBox="0 0 20 20" fill="currentColor"><rect width="12" height="14" x="4" y="6" rx="2" /></svg>,
//     spinner: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" className="animate-spin"><circle cx="12" cy="12" r="10" strokeWidth="4" /></svg>,
//   };

export const Icons = {
  user: (props) => (
    <svg {...props} viewBox="0 0 20 20" fill="currentColor">
      <circle cx="10" cy="10" r="10" />
    </svg>
  ),
  lock: (props) => (
    <svg {...props} viewBox="0 0 20 20" fill="currentColor">
      <rect width="12" height="14" x="4" y="6" rx="2" />
    </svg>
  ),
  spinner: (props) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="animate-spin"
    >
      <circle cx="12" cy="12" r="10" strokeWidth="4" />
    </svg>
  ),
  home: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 9.5l8.5-7 8.5 7v11h-5v-6h-7v6h-5z" />
    </svg>
  ),
  briefcase: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
      <rect x="4" y="7" width="16" height="10" rx="2" />
      <path d="M8 7v-2h8v2" />
    </svg>
  ),
  fileCheck: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 2h14l2 2v16c0 1.1-.9 2-2 2H4a2 2 0 01-2-2V4c0-1.1.9-2 2-2zm0 2v16h14V4H4zm7 11l-3-3 1.5-1.5L11 12.2l4.5-4.5L17 9l-6 6z" />
    </svg>
  ),
};

  