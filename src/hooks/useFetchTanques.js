import { shallow } from 'zustand/shallow';
import { useHistory } from 'react-router-dom';

// Context
import useAuth from '@Auth/userAuth';

// store
import { storeRemainingTank, storeModalTank } from '@Store/global';

// Service
import { getTanksUser, unlockPlanet, createProjectPlanet } from '@Service/tanks.service';

// Hooks
import { useGetProjects } from '@Hooks/useGetProjects';

export const useEventsTanks = () => {
  const { setLoading } = useAuth();

  const { setTanquesRestante } = storeRemainingTank(
    (state) => ({
      setTanquesRestante: state.setTanquesRestante,
    }),
    shallow
  );

  const { setModal, setModalInfo, getModalInfo } = storeModalTank(
    (state) => ({
      setModal: state.setModal,
      setModalInfo: state.setModalInfo,
      getModalInfo: state.getModalInfo,
    }),
    shallow
  );

  const { ProcessProjects } = useGetProjects();
  const history = useHistory();

  const getTanks = async () => {
    try {
      const tank = await getTanksUser();
      const { data } = tank;
      setTanquesRestante({
        remainingTanks: data.tanques_restantes,
      });
      return true;
    } catch (error) {
      console.log('Error get tanks: ', error);
    }
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // valida  planeta a desbloquear
  const handlePlanet = (planet, idProject) => {
    setLoading(true);
    exchangeTanks(planet, idProject);
  };

  const exchangeTanks = async (planetId, idProject) => {
    try {
      const exchange = await unlockPlanet({
        projectId: idProject,
        planet: capitalizeFirstLetter(planetId),
      });

      if (exchange.code === 0) {
        setTanquesRestante({ remainingTanks: exchange.tanques_restantes });
        const create = await createProjectPlanet({ projectId: idProject, planet: planetId });

        if (create.code === 0) {
          await ProcessProjects(idProject);
          history.push(`/${planetId}`);
          setLoading(false);
        } else if (create.code < 0) {
          setLoading(false);
        }
      } else if (exchange.code < 0) {
        const modal = JSON.stringify({
          modalTank: true,
          title: 'No cuentas con los tanques suficientes para acceder a este contenido.',
          message: `¿Deseas adquirir un paquete?`,
          rute: '/paquetes',
          tanques: `${getModalInfo().tanques}`,
          exchange: false,
          planet: `${getModalInfo().rute}`,
        });
        setModalInfo(JSON.parse(modal));
        setModal(true); 
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      return { code: -1, Error: error };
    }
  };

  return {
    getTanks,
    exchangeTanks,
    handlePlanet,
  };
};
