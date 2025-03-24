import { useEffect } from "react";
import style from '@Components/Button/button.module.scss';

  const Button = ({ text = "Click me", onClick = () => {} }, isSubmit = false) => {

  return (
    <button
      className={`${style.buttonPrimary}`}
      type={isSubmit ? "submit" : undefined}
      onClick={onClick}
    >
      <svg width="242" height="42" viewBox="0 0 242 42" xmlns="http://www.w3.org/2000/svg" fill="none">
        <path d="M23.5319 41L1 1H210.123L220.137 11.4348H236.827L241 20.1304L230.986 41H23.5319Z" fill="#FB6C2B"/>
      </svg>
      <svg width="242" height="42" viewBox="0 0 242 42" xmlns="http://www.w3.org/2000/svg" fill="none">
        <path d="M23.5319 41L1 1H210.123L220.137 11.4348H236.827L241 20.1304L230.986 41H23.5319Z" stroke="#E0FF4E"/>
      </svg>
      <span>{text}</span>
    </button>
  );
};

export default Button;
