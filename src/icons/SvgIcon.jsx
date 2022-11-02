import * as React from 'react';

const SvgIcon = props => (
  <svg
    viewBox="0 0 92 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    {...props}
  >
    <circle
      cx={46.05}
      cy={30.05}
      r={13.625}
      transform="rotate(.18 46.05 30.05)"
      stroke="#000"
      strokeWidth={4.75}
    />
    <path
      d="M3 42V18C3 9.716 9.716 3 18 3h56c8.284 0 15 6.716 15 15v24c0 8.284-6.716 15-15 15H18C9.716 57 3 50.284 3 42Z"
      stroke="#000"
      strokeWidth={5}
      strokeLinecap="round"
    />
    <circle cx={68.5} cy={14.5} r={4.875} stroke="#000" strokeWidth={3.25} />
  </svg>
);

export default SvgIcon;
