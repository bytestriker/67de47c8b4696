import { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

// Context
import useAuth from '@Auth/userAuth';

// Hooks
import { useEventsLuna } from '@Hooks/useEventsLuna';

// Constants
import { statusPlanet } from '@Helpers/constants';

// Styles
import '@Components/UtilsComponents/Styles.scss';

export const ModalAlert = ({ data, title, message, setModalSalir, getPageLuna }) => {
  const { contextValue } = useAuth();
  const { handleCreateproject, handleUpdateProject, manageProject } = useEventsLuna();
  const history = useHistory();
  const modal = useRef(null);

  const handleAlert = async (action, params) => {
    if (action === 'OK') {
      if (contextValue.isLogged() && params.id) {
        await handleUpdateProject(params, getPageLuna);
        setModalSalir(false);

        if (getPageLuna !== 5) {
          history.push('/');
        }
      } else if (contextValue.isLogged()) {
        await handleCreateproject(params);
        setModalSalir(false);
      } else {
        setModalSalir(false);
        history.push('/signup');
      }
    } else if (action === 'CANCELAR') {
      if (params.id) {
        setModalSalir(false);
        history.push('/');
      } else {
        manageProject(null, 0, statusPlanet.EMPIEZA, true);
        setModalSalir(false);
        history.push('/');
      }
    }
  };

  useEffect(() => {
    function handleClickOutsideModal(event) {
      if (modal.current && !modal.current.contains(event.target)) {
        setModalSalir(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutsideModal);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideModal);
    };
  }, []);

  return (
    <>
      <div className="modalAlert">
        <div className="container">
          <div className="modalContent" ref={modal} id="modalLuna" data-modal="modalLuna">
            <p>{title}</p>
            <strong>{message}</strong>
            <br></br>
            <div className="ButtonContent">
              <button className="btnModal-cancel" onClick={() => handleAlert('CANCELAR', data)}>
                No
              </button>
              <button className="btnModal-ok" onClick={() => handleAlert('OK', data)}>
                Si
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
