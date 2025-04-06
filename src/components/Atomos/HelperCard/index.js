// Images
import email from '@Assets/images/icons/email.png';
import earth from '@Assets/images/icons/earth.png';
import Button from 'src';
// Style
import style from '@Sass/components/cards.module.scss';

export const HelperCard = (props) => {
  return (
    <div className="planetHelper">
      <span className="planetHelperBorder planetHelperBorderTop"></span>
      <div className="planetHelperContainer">
        <div className="planetHelperTitle">
          
          <h2>Más herramientas</h2>
        </div>
        <div className="planetHelperContent">
          <p>
            ¿Necesitas más ayuda para realizar esta tarea?, aquí contamos con algunos materiales
            para ti.
          </p>
          <a href="">
            <span>Continuar</span>
          </a>
        </div>
      </div>
      <span className="planetHelperBorder planetHelperBorderBottom"></span>
    </div>
  );
};
