import { useEffect } from "react";
import button from '@Components/ButtonClose/button.module.scss';

const ButtonClose = ({ onClick = () => {} }) => {
  return (
    <button
      className={`${button.buttonClose}`}
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="none" stroke="#E0FF4E" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m8 8l32 32M8 40L40 8"/></svg>
    </button>
  );
};

export default ButtonClose;
