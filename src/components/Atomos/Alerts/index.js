import { shallow } from 'zustand/shallow';
import { useHistory } from 'react-router-dom';
import { FaInfoCircle } from 'react-icons/fa';

// Components
import Button from '@Components/Button';

// Store
import { storeModalTank } from '@Store/global';
import { lunaStore } from '@Store/luna';

// Contants
import { LocalStoragePlanets } from '@Helpers/constants';

// Hook
import { useEventsTanks } from '@Hooks/useFetchTanques';

// Styles
import styles from '@Sass/components/alerts.module.scss';
import general from '@Sass/pages/general.module.scss';

export const ErrorAlert = (props) => {
  return (
    <div className={styles.Alerts}>
      <div className={styles.error}>
        <span className={styles.spanError}>
          <FaInfoCircle className={styles.icon} /> <p>{props.message}</p>
        </span>
      </div>
    </div>
  );
};

export const ModalSuccesProject = (props) => {
  const history = useHistory();
  const { setAlert } = props;

  const handleAlert = () => {
    setAlert(false);
    history.push('/');
  };

  const nameProject = () => {
    const param = JSON.parse(localStorage.getItem(LocalStoragePlanets.LUNA)) || {};
    return <h4>{param?.nombre}</h4>;
  };

  return (
    <div className={styles.Modal}>
      <div className="container">
        <div className={styles.ModalContent}>
          <h3>¡FELICIDADES!</h3>
          <p>
            Haz completado <strong>Mercurio</strong> de tu proyecto
          </p>
          {nameProject()}
          <Button text="INICIO" isCentered={true} onClick={() => handleAlert()} />
        </div>
      </div>
    </div>
  );
};

export const ModalInfoProject = ({ setAlert, warningData }) => {
  return (
    <div className={styles.Modal}>
      <div className="container">
        <div className={styles.ModalContent}>
          <h3>¡INFORMACIÓN!</h3>
          <p dangerouslySetInnerHTML={{__html:warningData.message}}></p>
          <div className="buttons">
            <Button onClick={() => setAlert(false)} text="CONTINUAR" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ModalPopup = ({ setPopup }) => {
  return (
    <div className={styles.Modal}>
      <div className="container">
        <div className={styles.ModalContent}>
          <h3>¡Próximamente!</h3>
          <p>Muy pronto tendremos nuevos servicios increíbles</p>
          <div className={styles.ButtonContent}>
            <button className={styles.buttonContinue} onClick={() => setPopup(false)}>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ModalBlockPlanet = () => {
  const { handlePlanet } = useEventsTanks();
  const { storeTankModal, setModal } = storeModalTank(
    (state) => ({
      storeTankModal: state.storeTankModal,
      setModal: state.setModal,
    }),
    shallow
  );

  const { dataLuna } = lunaStore(
    (state) => ({
      dataLuna: state.dataLuna,
    }),
    shallow
  );
  const history = useHistory();

  const handleRute = () => {
    if (storeTankModal.exchange) {
      handlePlanet(storeTankModal.rute, dataLuna.id);
      setModal(false);
      return;
    }
    history.push(storeTankModal.rute);
    setModal(false);
  };

  return (
    <div className={styles.Modal}>
      <div className="container">
        <div className={styles.ModalContent}>
          <h3 dangerouslySetInnerHTML={{ __html: storeTankModal.title }}></h3>
          <p dangerouslySetInnerHTML={{ __html: storeTankModal.message }}></p>
          <div className={general.contentButtons}>
            <div className={general.flexButtons}>
              <button className="btnModal-cancel" onClick={() => setModal(false)}>
                No
              </button>
              <button className="btnModal-ok" onClick={() => handleRute()}>
                Si
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
