import { useHistory } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

// Context
import useAuth from '@Auth/userAuth';

// Store
import { lunaStore } from '@Store/luna';
import { globalStore } from '@Store/global';

// Hook
import { useEventsMercurio } from '@Hooks/useEventsMercurio';
import { useEventsMarte } from '@Hooks/useEventsMarte';
import { useEventSaturno } from '@Hooks/useEventSaturno';
import { useEventsUrano } from '@Hooks/useEventsUrano';
import { useEventsVenus } from '@Hooks/useEventVenus';
import { useEventJupiter } from '@Hooks/useEventsJupiter';

// Services
import { getProjectById, createProject, updateProject } from '@Service/entries';

// Helpers
import { handleCleanLink, handleSelectLink } from '@Helpers/api_utils';

// Constants
import { statusPlanet } from '@Helpers/constants';

export const useEventsLuna = () => {
  const { contextValue, setLoading, setReloadPacks, setPageLuna } = useAuth();
  const { setStateLuna } = lunaStore(
    (state) => ({
      setStateLuna: state.setLuna,
    }),
    shallow
  );
  const { setAlert, setMessage } = globalStore(
    (state) => ({
      setMessage: state.setMessage,
      setAlert: state.setAlert,
    }),
    shallow
  );
  const { projectMercurio } = useEventsMercurio();
  const { projectMarte } = useEventsMarte();
  const { projectSaturno } = useEventSaturno();
  const { projectUrano } = useEventsUrano();
  const { projectVenus } = useEventsVenus();
  const { projectJupiter } = useEventJupiter();
  const history = useHistory();

  // Crear proyecto, setea las preguntas en vacio y envia a la url de LUNA
  const handleCreateproject = async (data) => {
    setLoading(true);
    await createProject(data)
      .then((res) => {
        if (res.code === 0) {
          setReloadPacks(Math.random());
          handleGetProjectById(res?.data.id);
          history.push('/gracias');
          return;
        } else if (res.code < 0) {
          if (res.messageError === 'The nombre has already been taken.') {
            setLoading(false);
            setAlert(true);
            setMessage('EL NOMBRE DEL PROYECTO YA EXISTE ');
            setPageLuna(1);
            return;
          } else {
            setLoading(false);
            setAlert(true);
            setMessage('OCURRIO UN ERROR AL GUARDAR EL PROYECTO');
            return;
          }
        }
      })
      .catch((error) => {
        return error;
      });
  };

  // Obtener el proyecto seleccionado
  const handleGetProjectById = async (idItem) => {
    try {
      if (contextValue.isLogged()) {
        await getProjectById(idItem)
          .then((res) => {
            handleSelectLink(idItem);
            const data = res.data.data;
            const { completado } = data;
            if (completado) {
              manageProject(data, 1, statusPlanet.COMPLETADO, false);
              setLoading(false);
            } else {
              manageProject(data, 2, statusPlanet.INCOMPLETO, false);
              setLoading(false);
            }
          })
          .catch((err) => {
            return [];
          });
      } else {
        console.log('Not ID, Not Login');
        return [];
      }
    } catch (error) {
      console.log('Exception error get project-id', error);
      return [];
    }
  };

  // Actualizar proyecto
  const handleUpdateProject = async (data, page) => {
    try {
      if (contextValue.isLogged()) {
        setLoading(true);
        const update = await updateProject(data);
        if (update.status === 200 || update.status === 201) {
          if (page === 6) {
            const item = update?.data?.data;
            manageProject(item, 1, statusPlanet.COMPLETADO, false);
            setPageLuna(1);
            setReloadPacks(Math.random());
            setLoading(false);
            history.push('/gracias');
          } else {
            setLoading(false);
            setPageLuna(page);
          }
          return update;
        }
        if (update.status >= 400 || update.status >= 500) {
          return [];
        }
      }
    } catch (error) {
      console.log('Exception error update project', error);
      return [];
    }
  };

  // ruta a launch y elimina todos los estados y datos para iniciar en cero un proyecto
  const handleNewProject = () => {
    try {
      manageProject(null, 0, statusPlanet.EMPIEZA, true);
      projectMercurio(false, null, 0, statusPlanet.ACCEDER, true);
      projectMarte(false, null, 0, statusPlanet.ACCEDER, true);
      projectSaturno(false, null, 0, statusPlanet.ACCEDER, true);
      projectVenus(false, null, 0, statusPlanet.ACCEDER, true);
      projectUrano(false, null, 0, statusPlanet.ACCEDER, true);
      projectJupiter(false, null, 0, statusPlanet.ACCEDER, true);
      setPageLuna(1);
      handleCleanLink();
    } catch (error) {
      console.log('Exception error new project', error);
    }
  };

  // manejo de estado del objeto proyecto luna
  const manageProject = (data, complete, label, reset) => {
    try {
      if (reset) {
        const project = JSON.stringify({
          id: '',
          nombre: '',
          que: '',
          porque: '',
          como1: '',
          como2: '',
          como3: '',
          pre: '',
          complete: 0,
          label: label,
        });
        setStateLuna(JSON.parse(project));
        return;
      }

      const project = JSON.stringify({
        id: data.id,
        nombre: data.nombre,
        que: data.que,
        porque: data.porque,
        como1: data.como1,
        como2: data.como2,
        como3: data.como3,
        pre: data.pre,
        complete,
        label,
      });
      setStateLuna(JSON.parse(project));
    } catch (error) {
      console.log('Exception error manage project', error);
    }
  };

  return {
    handleCreateproject,
    handleGetProjectById,
    handleUpdateProject,
    handleSelectLink,
    handleCleanLink,
    handleNewProject,
    manageProject,
  };
};
