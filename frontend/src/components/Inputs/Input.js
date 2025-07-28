import React, { useState } from 'react';
import { FaRegEye, FaEyeSlash } from 'react-icons/fa';
import '../../styles/Input.css';

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="input-container">
      <label className="input-label">{label}</label>
      <div className='input-wrapper'>
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="input-field"
        />
        {type === 'password' && (
          <>
            {showPassword ? (
              <FaRegEye className="toggle-icon" onClick={togglePasswordVisibility} />
            ) : (
              <FaEyeSlash className="toggle-icon" onClick={togglePasswordVisibility} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
