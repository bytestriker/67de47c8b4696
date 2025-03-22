import { shallow } from 'zustand/shallow';

// Context
import useAuth from '@Auth/userAuth';

// Store
import { mercurioStore } from '@Store/mercurio';

// Services
import { getProjectMercurio, createProjectMercurio } from '@Service/mercurio.service';

// Helpers
import { statusPlanet } from '@Helpers/constants';

export const useEventsMercurio = () => {
  const { contextValue, setLoading } = useAuth();

  // Store de mercurio
  const { setStateMercurio } = mercurioStore(
    (state) => ({
      setStateMercurio: state.setMercurio,
    }),
    shallow
  );

  // Obtener el proyecto seleccionado
  const mercurioGetProjectById = async (idProject) => {
    try {
      if (contextValue.isLogged()) {
        setLoading(true);
        const res = await getProjectMercurio(idProject);
        if (res.code === 0) {
          if (res.data.completed) {
            projectMercurio(res.statusPlanet, res.data, 1, statusPlanet.COMPLETADO, false);
          } else {
            projectMercurio(res.statusPlanet, res.data, 2, statusPlanet.INCOMPLETO, false);
          }
          setLoading(false);
          return { status: 'success' };
        } else if (res.code < 0) {
          projectMercurio(false, null, 0, statusPlanet.ACCEDER, true);
          setLoading(false);
          return { status: 'error' };
        }
      } else {
        return [];
      }
    } catch (error) {
      return { status: 'error', error };
    }
  };

  // Crear proyecto
  const mercurioCreateProject = async (params) => {
    try {
      if (contextValue.isLogged()) {
        setLoading(true);
        const res = await createProjectMercurio(params);
        
        if (res.code === 0) {
          if (res.data.completed) {
            projectMercurio(res.statusPlanet, res.data, 1, statusPlanet.COMPLETADO, false);
            setLoading(false);
            return { status: 'OK' };
          } else {
            projectMercurio(res.statusPlanet, res.data, 2, statusPlanet.INCOMPLETO, false);
            setLoading(false);
            return { status: 'OK' };
          }
        } else if (res.code < 0) {
          setLoading(false);
          return { status: 'ERROR' };
        }
      }
    } catch (error) {
      console.log(error);
      return { status: 'error', error };
    }
  };

  // manejo de estado del planeta marte
  const projectMercurio = (lockPlanet, data, complete, label, reset) => {
    try {
      if (reset) {
        const project = JSON.stringify({
          planet: 'Mercurio',
          id: '',
          que_resuelve: '',
          a_quien_resuelve: '',
          a_quien_resuelve_new: '',
          complete: 0,
          label: statusPlanet.ACCEDER,
          lockedPlanet: false,
        });
        setStateMercurio(JSON.parse(project));
        return;
      }
      if (!data.que_resuelve) {
        data.que_resuelve = '';
      }
      if (!data.a_quien_resuelve) {
        data.a_quien_resuelve = '';
      }
      if (!data.a_quien_resuelve_new) {
        data.a_quien_resuelve_new = '';
      }
      const project = JSON.stringify({
        planet: 'Mercurio',
        id: data.id,
        que_resuelve: data.que_resuelve,
        a_quien_resuelve: data.a_quien_resuelve,
        a_quien_resuelve_new: data.a_quien_resuelve_new,
        complete,
        label,
        lockedPlanet: lockPlanet,
      });
      setStateMercurio(JSON.parse(project));
    } catch (error) {
      console.log('Exception error manage project', error);
    }
  };

  return {
    mercurioGetProjectById,
    mercurioCreateProject,
    projectMercurio,
  };
};
