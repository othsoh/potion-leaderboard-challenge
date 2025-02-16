import React from 'react';
import './Triangle.css';

const Triangle = ({ isUp }) => {
  return (
    <span
      className={`triangle transition-transform duration-500 ${
        isUp ? 'rotate-180' : ''
      }`}
    />
  );
};

export default Triangle;