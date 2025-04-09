import { useHistory } from 'react-router-dom';
import Button from '@Components/Button';

import styles from '@Sass/pages/notfound.module.scss';
import _Astronaut from '@Assets/images/astronauta.png';
import _moon from '@Assets/images/moon.png';

import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  handleRoute ()  {
    history.push('/');
  };



  componentDidCatch(error, info) {
    console.error('Uncaught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.NotFound}>
        <div className="container">
      <img src={_Astronaut} alt="astronauta" className={styles.spacemanSpin}/>
          <div className={styles.Content}>
          &nbsp;&nbsp;<h1>Error 500</h1>
            <img src={_moon} alt="moon" className={styles.moon}/>
  
            <p>¡Algo salió mal al procesar la solicitud en el servidor!</p>
            <div className="fieldset">
              <Button isAlt={true} onClick={()=>handleRoute()} text="Volver al Inicio" />
            </div>
          </div>
        </div>
      </div>
  
);
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
