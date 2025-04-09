import { useHistory } from 'react-router-dom';
import Button from '@Components/Button';

import styles from '@Sass/pages/notfound.module.scss';
import _Astronaut from '@Assets/images/astronauta.png';
import _moon from '@Assets/images/moon.png';
import { useEffect } from 'react';

const NotFound = () => {
  const history = useHistory();

  const handleRute = () => {
    history.push('/');
  };

  useEffect(() => { console.log("not found component "); },[]); 



  alert("chicas y grandes")
  return (
    <div className={styles.NotFound}>
      <div className="container">
        <img src={_Astronaut} alt="astronauta" className={styles.spacemanSpin} />
        <div className={styles.Content}>
          &nbsp;&nbsp;<h1>Error 404</h1>
          <img src={_moon} alt="moon" className={styles.moon} />
          <p>¡El recurso solicitado no se pudo encontrar en este servidor!</p>
          <div className="fieldset">
            <Button isAlt={true} onClick={handleRute} text="Volver al Inicio" />
          </div>
        </div>
      </div>
    </div>  

  );
};

export default NotFound;
