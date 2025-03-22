import useAuth from '@Auth/userAuth';
import { shallow } from 'zustand/shallow';
import { useHistory } from 'react-router-dom';

// Store
import { globalStore, storeRemainingTank, storeModalTank, Popup } from '@Store/global';
import { lunaStore } from '@Store/luna';

// Service
import { getProjectMercurio } from '@Service/mercurio.service';
import { getProjectVenus } from '@Service/venus.service';
import { getProjectSaturno } from '@Service/saturno.service';
import { getProjectMarte } from '@Service/marte.service';
import { getProjectUrano } from '@Service/urano.service';
import { getProjectJupiter } from '@Service/jupiter.service';

export const valPackage = () => {
  const { contextValue } = useAuth();
  const { setAlert, setMessage } = globalStore(
    (state) => ({
      setAlert: state.setAlert,
      setMessage: state.setMessage,
    }),
    shallow
  );
  const { getLuna } = lunaStore(
    (state) => ({
      getLuna: state.getLuna,
    }),
    shallow
  );
  const { remainingTankData } = storeRemainingTank(
    (state) => ({
      remainingTankData: state.remainingTankData,
    }),
    shallow
  );
  const { setModal, setModalInfo } = storeModalTank(
    (state) => ({
      setModal: state.setModal,
      setModalInfo: state.setModalInfo,
    }),
    shallow
  );

  const { setPopup } = Popup(
    (state) => ({
      setPopup: state.setPopup
    }),
    shallow
  );

  const history = useHistory();

  // valida si el usuario tiene sesion y proyecto seleccionado para poder continuar
  const validateProject = (rute, tanques) => {
    const param = getLuna();
    if (contextValue.isLogged() && param.id) {
      handleplanet(rute, tanques);
      return;
    }
    if (contextValue.isLogged()) {
      setAlert(true);
      setMessage('Debes seleccionar un proyecto antes de continuar.');
      return;
    }
    setAlert(true);
    setMessage('Debes iniciar sesión para acceder.');
  };

  const popup = () =>{

    
    setPopup(true);

  };

  // valida la ruta del planeta seleccionado
  const handleplanet = (key, tanques) => {
    switch (key) {
      case 'mercurio':
        handleServiceMercurio(key, tanques);
        break;
      case 'venus':
        handleServiceVenus(key, tanques);
        break;
      case 'marte':
        handleServiceMarte(key, tanques);
        break;
      case 'jupiter':
        handleServiceJupiter(key, tanques);
        break;
      case 'saturno':
        handleServiceSaturno(key, tanques);
        break;
      case 'urano':
        handleServiceUrano(key, tanques);
        break;

      default:
        break;
    }
  };

  // valida si hay tanques en el store
  const handleValidateTanks = (rute, tanques) => {
    if (remainingTankData.remainingTanks > 0) {
      // abrimos modal de canjeo de tanques
      const modal = JSON.stringify({
        modalTank: true,
        title: '¿Deseas acceder a este contenido?',
        message: `Canjealo por ${tanques} tanques.`,
        rute: rute,
        tanques: tanques,
        exchange: true,
        planet: rute,
      });
      setModalInfo(JSON.parse(modal));
      setModal(true);
    } else {
      // abrimos pantalla de compra de  tanques
      const modal = JSON.stringify({
        modalTank: true,
        title: 'No cuentas con los tanques suficientes para acceder a este contenido.',
        message: '¿Deseas adquirir un paquete?',
        rute: '/paquetes',
        tanques: tanques,
        exchange: false,
        planet: rute,
      });
      setModalInfo(JSON.parse(modal));
      setModal(true);
    }
  };

  /**
   * Consultamos servicio correspondiente
   * Para saber si el planeta esta desbloqueado
   */

  // get mercurio
  const handleServiceMercurio = async (rute, tanques) => {
    const param = getLuna();
    const res = await getProjectMercurio(param.id);
    if (res.code === 0) {
      history.push({ pathname: rute, from: location });
    } else if (res.code < 0) {
      handleValidateTanks(rute, tanques);
    }
  };

  // get venus
  const handleServiceVenus = async (rute, tanques) => {
    const param = getLuna();
    const res = await getProjectVenus(param.id);
    if (res.code === 0) {
      history.push({ pathname: rute, from: location });
    } else if (res.code < 0) {
      handleValidateTanks(rute, tanques);
    }
  };

  // get marte
  const handleServiceMarte = async (rute, tanques) => {
    const param = getLuna();
    const res = await getProjectMarte(param.id);
    if (res.code === 0) {
      history.push({ pathname: rute, from: location });
    } else if (res.code < 0) {
      handleValidateTanks(rute, tanques);
    }
  };

  // get saturno
  const handleServiceSaturno = async (rute, tanques) => {
    const param = getLuna();
    const res = await getProjectSaturno(param.id);
    if (res.code === 0) {
      history.push({ pathname: rute, from: location });
    } else if (res.code < 0) {
      handleValidateTanks(rute, tanques);
    }
  };

  // get saturno
  const handleServiceUrano = async (rute, tanques) => {
    const param = getLuna();
    const res = await getProjectUrano(param.id);
    if (res.code === 0) {
      history.push({ pathname: rute, from: location });
    } else if (res.code < 0) {
      handleValidateTanks(rute, tanques);
    }
  };

  // get saturno
  const handleServiceJupiter = async (rute, tanques) => {
    const param = getLuna();
    const res = await getProjectJupiter(param.id);
    if (res.code === 0) {
      history.push({ pathname: rute, from: location });
    } else if (res.code < 0) {
      handleValidateTanks(rute, tanques);
    }
  };

  return {
    validateProject,popup
  };
};
