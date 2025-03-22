import { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

// Store
import { globalStore } from '@Store/global';

// Hooks
import { useEventsVenus } from '@Hooks/useEventVenus';

// Styles
import styles from '@Sass/components/modals.module.scss';

export const ModalVenus = (props) => {
  const { setModal, setPage, message, title, buttonName, page } = props;
  const history = useHistory();

  const handleManageModal = () => {
    if (page === 9 || page === 10) {
      setPage(8);
      setModal(false);
    }else{
      setModal(false);
    }
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

export const ModalSalirVenus = ({ title, message, setModalSalir, data, proyect, page }) => {
  const { venusCreateProject, venusCreateFoda1, venusCreateFoda2, venusCreateBuyerPersona } =
    useEventsVenus();
  const { setMessage, setAlert } = globalStore(
    (state) => ({
      setMessage: state.setMessage,
      setAlert: state.setAlert,
    }),
    shallow
  );

  const history = useHistory();
  const modalVenusRef = useRef(null);

  const handleAlert = async (action, idProyect, params) => {
    if (action === 'OK') {
      setModalSalir(false);
      if (page === 0) {
        if (data.painpoints.length === 0) {
          setMessage('Debes ingresar datos en esta sección');
          setAlert(true);
          return;
        }
        await handleCreateProject(params);
        history.push('/');
      } else if (page === 1) {
        if (data.painpoints.length === 0) {
          setMessage('Debes ingresar datos en esta sección');
          setAlert(true);
          return;
        }
        await handleCreateProject(params);
        history.push('/');
      } else if (page === 2) {
        if (data.fortalezas.length === 0 || data.oportunidades.length === 0) {
          setMessage('Debes ingresar datos en esta sección');
          setAlert(true);
          return;
        }
        await handleCreateProject(params);
        history.push('/');
      } else if (page === 3) {
        if (data.debilidades.length === 0 || data.amenazas.length === 0) {
          setMessage('Debes ingresar datos en esta sección');
          setAlert(true);
          return;
        }
        await handleCreateProject(params);
        history.push('/');
      } else if (page === 4) {
        const { foda_1 } = data;
        if (foda_1.fortalezas_oportunidades.length === 0 || foda_1.conclusion === '') {
          setMessage('Debes ingresar datos en esta sección');
          setAlert(true);
          return;
        }
        await handleCreateFoda1(params);
        history.push('/');
      } else if (page === 5) {
        const { foda_2 } = data;
        // if (foda_2.debilidades_amenazas.length === 0 || foda_2.conclusion === '') {
        if (foda_2.oportunidades_debilidades.length === 0 || foda_2.conclusion === '') {
          setMessage('Debes ingresar datos en esta sección');
          setAlert(true);
          return;
        }
        await handleCreateFoda2(params);
        history.push('/');
      } else if (page === 6) {
        const { foda_3 } = data;
        if (foda_3.fortalezas_amenazas.length === 0 || foda_3.conclusion === '') {
          setMessage('Debes ingresar datos en esta sección');
          setAlert(true);
          return;
        }
        await handleCreateFoda3(params);
        history.push('/');
      } else if (page === 7) {
        const { foda_4 } = data;
        if (foda_4.debilidades_amenazas.length === 0 || foda_4.conclusion === '') {
          setMessage('Debes ingresar datos en esta sección');
          setAlert(true);
          return;
        }
        await handleCreateFoda4(params);
        history.push('/');
      } else if (page === 8) {
        const propiedades = Object.values(data.buyer);
        const algunaPropiedadVacia = propiedades.some((valor) => valor === '');
        if (algunaPropiedadVacia) {
          setMessage('Debes ingresar datos en esta sección');
          setAlert(true);
          return;
        }
        await handleCreateBuyer(params);
        history.push('/');
      }
    } else if (action === 'CANCELAR') {
      setModalSalir(false);
      history.push('/');
    }
  };

  const handleCreateProject = async (data) => {
    const { painpoints, fortalezas, oportunidades, debilidades, amenazas } = data;
    const params = {
      painpoints: painpoints,
      fortalezas: fortalezas,
      oportunidades: oportunidades,
      debilidades: debilidades,
      amenazas: amenazas,
    };
    const res = await venusCreateProject(params);
    if (res.code === 0) {
      history.push('/');
      return;
    }
  };

  const handleCreateFoda1 = async (data) => {
    const { foda_1 } = data;
    const res = await venusCreateFoda1(foda_1);
    if (res.code === 0) {
      history.push('/');
      return;
    }
  };

  const handleCreateFoda2 = async (data) => {
    const { foda_2 } = data;
    const res = await venusCreateFoda2(foda_2);
    if (res.code === 0) {
      history.push('/');
      return;
    }
  };

  const handleCreateFoda3 = async (data) => {
    const { foda_3 } = data;
    const res = await venusCreateFoda3(foda_3);
    if (res.code === 0) {
      history.push('/');
      return;
    }
  };

  const handleCreateFoda4 = async (data) => {
    const { foda_4 } = data;
    const res = await venusCreateFoda4(foda_4);
    if (res.code === 0) {
      history.push('/');
      return;
    }
  };

  const handleCreateBuyer = async (data) => {
    const { buyer } = data;
    const res = await venusCreateBuyerPersona(buyer);
    if (res.code === 0) {
      history.push('/');
      return;
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalVenusRef.current && !modalVenusRef.current.contains(event.target)) {
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
        <div className={styles.ModalContent} ref={modalVenusRef}>
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
