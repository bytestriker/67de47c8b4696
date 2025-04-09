import { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

// Components
import Button from '@Components/Button';

// Hooks
import { useEventsMercurio } from '@Hooks/useEventsMercurio';

// Store
import { lunaStore } from '@Store/luna';

// Constants
import { statusPlanet } from '@Helpers/constants';

// Styles
import styles from '@Sass/components/alerts.module.scss';

export const ModalMercurio = (props) => {
  const { mercurioCreateProject } = useEventsMercurio();
  const history = useHistory();
  const { data, setModalSalir } = props;
  const modalMercurioRef = useRef(null);

  const handleAlert = async (action, params) => {
    if (action === 'OK') {
      await mercurioCreateProject(params);
      setModalSalir(false);
      history.push('/');
    } else if (action === 'CANCELAR') {
      setModalSalir(false);
      history.push('/');
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalMercurioRef.current && !modalMercurioRef.current.contains(event.target)) {
        setModalSalir(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.Modal}>
      <div className="container">
        <div className={styles.ModalContent} ref={modalMercurioRef}>
          <p>{props.title}</p>
          <strong>{props.message}</strong>
          <div className="buttons">
            <Button text="NO" isAlt onClick={() => handleAlert('CANCELAR', data)} />
            <Button text="SI" onClick={() => handleAlert('OK', data)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ModalSuccesProject = (props) => {
  const history = useHistory();
  const { setAlert } = props;
  const { getLuna } = lunaStore(
    (state) => ({
      getLuna: state.getLuna,
    }),
    shallow
  );

  const handleAlert = () => {
    setAlert(false);
    history.push('/');
  };

  return (
    <div className={styles.Modal}>
      <div className="container">
        <div className={styles.ModalContent}>
          <h3>¡FELICIDADES!</h3>.
          <p>
            Haz completado <strong>Mercurio</strong> de tu proyecto
          </p>
          {getLuna() ? <h4>getLuna().nombre</h4> : ''}
          <div className={`${styles.ButtonContent} buttons`}>
            <Button className={styles.buttonContinue} onClick={() => handleAlert()} text="INICIO" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ModalInfoProject = (props) => {
  const { setModal, message } = props;
  return (
    <div className={styles.Modal}>
      <div className="container">
        <div className={styles.ModalContent}>
          <h3>¡INFORMACIÓN!</h3>
          <p dangerouslySetInnerHTML={{ __html: message.message }}></p>
          <div className={`${styles.ButtonContent} buttons`}>
            <Button
              className={styles.buttonContinue}
              onClick={() => setModal(false)}
              text="CONTINUAR"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
