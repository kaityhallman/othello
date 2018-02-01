import React from 'react';

function Square({ color, handleClick }) {
  return (
    <td
      style={{
        overflow: 'hidden',
        width: 'auto',
        height: '25px',
        color: 'red',
        borderColor: 'black',
        border: '1px solid black',
      }}
      onClick={handleClick}
    >
      <div
        style={{
          color,
          border: `1px solid ${color}`,
          backgroundColor: color,
          backgroundSize: '100%',
          borderRadius: '50%',
          height: '100%',
        }}
      />
    </td>
  );
}

export default Square;
