import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './PasswordInput.scss';

const PasswordInput = React.forwardRef(({ 
  label,
  name,
  placeholder = 'Enter password',
  className = '',
  error = '',
  required = false,
  ...rest
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`password-input-wrapper ${className}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <div className="password-input-container">
        <input
          type={showPassword ? 'text' : 'password'}
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          className={`password-input ${error ? 'error' : ''}`}
          ref={ref}
          {...rest}
        />
        <button
          type="button"
          onClick={togglePassword}
          className="toggle-password"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="currentColor"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5ZM12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7ZM12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15Z" fill="currentColor"/>
              <path d="M2 2L22 22" stroke="currentColor" strokeWidth="2"/>
            </svg>
          )}
        </button>
      </div>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
});

PasswordInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool
};

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput; 