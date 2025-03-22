import { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Hooks
import { useEventSaturno } from '@Hooks/useEventSaturno';

// Constants
import { statusPlanet } from '@Helpers/constants';

// Styles
import styles from '@Sass/components/modals.module.scss';

export const ModalSalirSaturno = ({ title, message, setModalSalir, data, proyect }) => {
  const { saturnoCreateProject}= useEventSaturno();
  const history = useHistory();
  const modalSaturnoRef = useRef(null);

  const handleAlert = async (action, id, params) => {
    if (action === 'OK') {
      const object = {
        awarenesses: params.awarenesses,
        considerations: params.considerations,
        purchases: params.purchases,
        retentions: params.retentions,
      };
      await saturnoCreateProject(id, object);
      setModalSalir(false);
      history.push('/');
    } else if (action === 'CANCELAR') {
      setModalSalir(false);
      history.push('/');
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalSaturnoRef.current && !modalSaturnoRef.current.contains(event.target)) {
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
        <div className={styles.ModalContent} ref={modalSaturnoRef}>
          <p>{title}</p>
          <strong>{message}</strong>
          <div className={styles.ButtonContent}>
            <button
              className="btnModal-cancel"
              onClick={() => handleAlert('CANCELAR', proyect, data)}
            >
              No
            </button>
            <button className="btnModal-ok" onClick={() => handleAlert('OK', proyect, data)}>
              Si
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ModalSaturno = (props) => {
  const { setModal, setPage, message, title, buttonName, page } = props;
  const history = useHistory();

  const handleManageModal = () => {
    if (page) {
      if (page !== 5) {
        setPage(page);
        setModal(false);
        return;
      }
    }
    setModal(false);
    history.push('/');
  };
  return (
    <div className={styles.Modal}>
      <div className="container">
        <div className={styles.ModalContent}>
          <h3>{title}</h3>
          <p dangerouslySetInnerHTML={{ __html: message }}></p>
          <div className={styles.ButtonContent}>
            <button className={styles.buttonContinue} onClick={() => handleManageModal()}>
              {buttonName}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
