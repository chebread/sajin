import * as React from 'react';

const SvgInfo = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    xmlSpace="preserve"
    role="img"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M11 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm0 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0z"
      fillRule="evenodd"
    />
  </svg>
);

export default SvgInfo;

