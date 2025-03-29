import { useEffect } from "react";
import button from '@Components/ButtonClose/button.module.scss';

const ButtonClose = ({ onClick = () => {} }) => {
  return (
    <button
      className={`${button.buttonClose}`}
      onClick={onClick}
    >
    </button>
  );
};




export default ButtonClose;
