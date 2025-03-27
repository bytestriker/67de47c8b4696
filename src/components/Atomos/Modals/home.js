import { useHistory } from 'react-router-dom';

// CONTEXT
import useAuth from '@Auth/userAuth';

// Styles
import styles from '@Sass/components/modals.module.scss';

export const ModalMain = (props) => {
  const { contextValue } = useAuth();
  const history = useHistory();
  const { setModalSalir } = props;

  const handleManageModal = (action, data) => {
    if (action === 'OK') {
      if (contextValue.isLogged() && data?.id) {
        // actualizar proyecto
        setModalSalir(false);
        history.push('/');
      } else if (contextValue.isLogged()) {
        // crear proyecto
        setModalSalir(false);
        history.push('/');
      } else {
        setModalSalir(false);
        history.push('/signup');
      }
    } else if (action === 'CANCELAR') {
      setModalSalir(false);
      history.push('/');
    }
  };

  return (
    <div className={styles.Modal}>
      <div className="container">
        <div className={styles.ModalContent}>
          <p>Estás a punto de salir</p>
          <h3>¿Deseas guardar tu información?</h3>
          <div className={styles.ButtonContent}>
            <button className={styles.buttonCancelar} onClick={() => handleManageModal('CANCELAR')}>
              NO
            </button>
            <button className={styles.buttonContinue} onClick={() => handleManageModal('OK')}>
              SI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
