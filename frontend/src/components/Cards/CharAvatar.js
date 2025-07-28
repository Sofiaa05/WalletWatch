import React from 'react';
import { getInitials } from '../../utils/helper';

const CharAvatar = ({ fullname, width = '3rem', height = '3rem', style = {} }) => {
  return (
    <div
      style={{
        width,
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '9999px',
        backgroundColor: '#f3f4f6',
        color: '#111827',
        fontWeight: 500,
        fontSize: '1rem',
        ...style, 
      }}
    >
      {getInitials(fullname || " ")}
    </div>
  );
};

export default CharAvatar;


