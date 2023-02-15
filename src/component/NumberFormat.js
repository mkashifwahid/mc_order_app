import React from 'react';

const NumberFormat = ({ value, decimal }) => {
  return (
    <span>
      {value === 0
        ? '-'
        : value
            .toFixed(decimal)
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
            .replace(/-(.*)/, '($1)')}
    </span>
    //  replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  );
};

export default NumberFormat;
