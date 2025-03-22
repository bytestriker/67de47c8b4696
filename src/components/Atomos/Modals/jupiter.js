import { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

// Store
import { globalStore } from '@Store/global';

// Hooks
import { useEventJupiter } from '@Hooks/useEventsJupiter';

// Styles
import styles from '@Sass/components/modals.module.scss';

export const ModalJupiter = ({ setModal, setPage, message, title, buttonName, page }) => {
  const history = useHistory();

  const handleManageModal = () => {
    if (page && page !== 9) {
      setPage(page);
      setModal(false);
      return;
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

export const ModalSalirJupiter = ({
  title,
  message,
  setModalSalir,
  dataJupiter,
  proyectID,
  page,
}) => {
  console.log(title, message, setModalSalir, dataJupiter, proyectID, page);
  const { setMessage, setAlert } = globalStore(
    (state) => ({
      setMessage: state.setMessage,
      setAlert: state.setAlert,
    }),
    shallow
  );

  const { jupiterCreateProject, jupiterCreateNombres, jupiterCrearMarca } = useEventJupiter();
  const history = useHistory();
  const modalJupiterRef = useRef(null);

  const validateParams = (data) => {
    const algunCampoVacio = data.some((value) => {
      return value.trim() === '' || !value;
    });
    return algunCampoVacio;
  };

  const handleAlert = async (action, id, params, pageIn) => {
    if (action === 'OK') {
      if (pageIn === 1) {
        const { caracteristicas } = params;
        if (caracteristicas.length === 0 || validateParams(caracteristicas)) {
          setModalSalir(false);
          setMessage('Debes ingresar datos en esta sección');
          setAlert(true);
          return;
        }
        await jupiterCreateProject(id, params);
        setModalSalir(false);
        history.push('/');
        return;
      }

      if (pageIn === 2) {
        const { adjetivos_calificativos } = params;
        if (adjetivos_calificativos.length === 0 || validateParams(adjetivos_calificativos)) {
          setModalSalir(false);
          setMessage('Debes ingresar datos en esta sección');
          setAlert(true);
          return;
        }
        await jupiterCreateProject(id, params);
        setModalSalir(false);
        history.push('/');
        return;
      }

      if (pageIn === 3) {
        const { objetivos } = params;
        if (objetivos.length === 0 || validateParams(objetivos)) {
          setModalSalir(false);
          setMessage('Debes ingresar datos en esta sección');
          setAlert(true);
          return;
        }
        await jupiterCreateProject(id, params);
        setModalSalir(false);
        history.push('/');
        return;
      }

      if (pageIn === 4) {
        const { significados } = params;
        if (significados.length === 0 || validateParams(significados)) {
          setModalSalir(false);
          setMessage('Debes ingresar datos en esta sección');
          setAlert(true);
          return;
        }
        await jupiterCreateProject(id, params);
        setModalSalir(false);
        history.push('/');
        return;
      }

      if (pageIn === 5) {
        const { ideas_nombre } = params;
        if (ideas_nombre.length === 0 || validateParams(ideas_nombre)) {
          setModalSalir(false);
          setMessage('Debes ingresar datos en esta sección');
          setAlert(true);
          return;
        }
        await jupiterCreateProject(id, params);
        setModalSalir(false);
        history.push('/');
        return;
      }

      if (pageIn === 6) {
        if (params.opcion_1 === '' || params.opcion_2 === '' || params.opcion_3 === '') {
          setModalSalir(false);
          setMessage('Debes seleccionar tus opciones');
          setAlert(true);
          return;
        }
        await jupiterCreateNombres(id, params);
        setModalSalir(false);
        history.push('/');
        return;
      }
      if (pageIn === 8) {
        const { adjetivos } = params;

        if (adjetivos.length === 0 || validateParams(adjetivos)) {
          setModalSalir(false);
          setMessage('Debes agregar tus adjetivos');
          setAlert(true);
          return;
        } else {
          await jupiterCrearMarca(id, params);
          setModalSalir(false);
          history.push('/');
          return;
        }
      }
      if (pageIn === 9) {
        setModalSalir(false);
        history.push('/');
        return;
      }
    } else if (action === 'CANCELAR') {
      setModalSalir(false);
      history.push('/');
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalJupiterRef.current && !modalJupiterRef.current.contains(event.target)) {
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
        <div className={styles.ModalContent} ref={modalJupiterRef}>
          <p>{title}</p>
          <strong>{message}</strong>
          <div className={styles.ButtonContent}>
            <button
              className="btnModal-cancel"
              onClick={() => handleAlert('CANCELAR', proyectID, dataJupiter, page)}
            >
              No
            </button>
            <button
              className="btnModal-ok"
              onClick={() => handleAlert('OK', proyectID, dataJupiter, page)}
            >
              Si
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
