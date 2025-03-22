import { shallow } from 'zustand/shallow';

// Context
import useAuth from '@Auth/userAuth';

// Store
import { marteStore } from '@Store/marte';
import { lunaStore } from '@Store/luna';

// Services
import {
  createProyectMarte,
  getProjectMarte,
  createBussinesMarte,
  getBussinesMarte,
} from '@Service/marte.service';

// Helpers
import { statusPlanet } from '@Helpers/constants';

export const useEventsMarte = () => {
  const { contextValue, setLoading } = useAuth();

  // Store de mercurio
  const { setMarte, getMarte } = marteStore(
    (state) => ({
      setMarte: state.setMarte,
      getMarte: state.getMarte,
    }),
    shallow
  );
  const { getLuna, dataLuna } = lunaStore(
    (state) => ({
      getLuna: state.getLuna,
      dataLuna: state.dataLuna,
    }),
    shallow
  );

  // Obtener el proyecto seleccionado
  const marteGetProjectById = async () => {
    try {
      if (contextValue.isLogged()) {
        setLoading(true);
        const res = await getProjectMarte(dataLuna.id);
        if (res.code === 0) {
          if (res.data.completed) {
            projectMarte(res.Status_planeta, res.data, 1, statusPlanet.COMPLETADO, false);
            bussinesMarte(dataLuna.id, res.Status_planeta);
            return { data: res.data, code: 0 };
          } else {
            projectMarte(res.Status_planeta, res.data, 2, statusPlanet.INCOMPLETO, false);
            bussinesMarte(dataLuna.id, res.Status_planeta);
            return { data: res.data, code: 0 };
          }
        } else if (res.code < 0) {
          projectMarte(false, null, 0, statusPlanet.ACCEDER, true);
          setLoading(false);
          return { status: 'error', code: -1 };
        }
      } else {
        return { status: 'error', message: 'usuario no firmado' };
      }
    } catch (error) {
      return { status: 'error', error };
    }
  };

  const bussinesMarte = async (idProject, bloqueo) => {
    try {
      const negocio = await getBussinesMarte(idProject);

      if (negocio.code === 0) {
        const modeloNegocio = {
          modelo_negocio: {
            value_proposition: negocio.data.value_proposition,
            revenue_streams: negocio.data.revenue_streams,
            modelo_negocio: negocio.data.modelo_negocio,
          },
        };
        if (negocio.data.completed) {
          projectMarte(bloqueo, modeloNegocio, 1, statusPlanet.COMPLETADO, false);
          setLoading(false);
          return { data: negocio.data };
        } else {
          projectMarte(bloqueo, modeloNegocio, 2, statusPlanet.INCOMPLETO, false);
          setLoading(false);
          return { data: negocio.data };
        }
      } else if (negocio.code < 0) {
        const modeloNegocio = {
          modelo_negocio: {
            value_proposition: '',
            revenue_streams: '',
            modelo_negocio: '',
          },
        };
        projectMarte(bloqueo, modeloNegocio, 2, statusPlanet.INCOMPLETO, false);
        setLoading(false);
        return { status: 'error', code: 400 };
      }
    } catch (error) {
      return { status: 'error', error };
    }
  };

  // obtener proyecto modelo negocio
  const getModelBussines = async (idProject) => {
    try {
      if (contextValue.isLogged()) {
        const res = await getBussinesMarte(idProject);
        if (res.code === 0) {
          if (res.data.completed) {
            return { data: res.data, code: 0 };
          } else {
            return { data: res.data, code: 0 };
          }
        } else if (res.code < 0) {
          return { data: 'error', code: -1 };
        }
      }
    } catch (error) {
      return { status: 'error', error };
    }
  };

  // Crear proyecto marte primera parte
  const marteCreateProject = async (params) => {
    try {
      if (contextValue.isLogged()) {
        setLoading(true);
        const res = await createProyectMarte(getLuna().id, JSON.stringify(params));
        if (res.code === 0) {
          if (res.data.completed) {
            projectMarte(res.Status_planeta, res.data, 1, statusPlanet.COMPLETADO, false);
            bussinesMarte(getLuna().id, res.Status_planeta);
            setLoading(false);
            return { status: 'OK' };
          } else {
            projectMarte(res.Status_planeta, res.data, 2, statusPlanet.INCOMPLETO, false);
            bussinesMarte(getLuna().id, res.Status_planeta);
            setLoading(false);
            return { status: 'OK' };
          }
        } else if (res.code < 0) {
          setLoading(false);
          return { status: 'ERROR' };
        }
      }
    } catch (error) {
      return { status: 'error', error };
    }
  };

  // Crear proyecto segunda parte modelo negocio
  const marteCreateProjectBussines = async (params) => {
    try {
      if (contextValue.isLogged()) {
        setLoading(true);
        const res = await createBussinesMarte(getLuna().id, params);
        if (res.code === 0) {
          const modelo = {
            modelo_negocio: {
              value_proposition: res.data.value_proposition,
              revenue_streams: res.data.revenue_streams,
              modelo_negocio: res.data.modelo_negocio,
            },
          };
          if (res.data.completed) {
            projectMarte('desbloqueado', modelo, 1, statusPlanet.COMPLETADO, false);
            setLoading(false);
            return { status: 'OK' };
          } else {
            projectMarte('desbloqueado', modelo, 2, statusPlanet.INCOMPLETO, false);
            setLoading(false);
            return { status: 'OK' };
          }
        } else if (res.code < 0) {
          setLoading(false);
          return { status: 'ERROR' };
        }
      } else {
        return { status: 'error', message: 'usuario no firmado' };
      }
    } catch (error) {
      return { status: 'error', error };
    }
  };

  // manejo de estado del objeto proyecto Marte
  const projectMarte = (lockPlanet, data, complete, label, reset) => {
    try {
      if (reset) {
        const marte = JSON.stringify({
          planet: 'Marte',
          id: '',
          propuesta_valor: '',
          value_proposition: [],
          key_activities: [],
          revenue_streams: [],
          customer_relationships: [],
          channels: [],
          key_partners: [],
          cost_structure: [],
          customer_segments: [],
          key_resources: [],
          modelo_negocio: {
            value_proposition: '',
            revenue_streams: '',
            modelo_negocio: '',
          },
          complete: 0,
          label: statusPlanet.ACCEDER,
          lockedPlanet: false,
        });
        setMarte(JSON.parse(marte));
        return;
      }

      if (data.modelo_negocio) {
        const model = getMarte();
        const stateMarte = JSON.stringify({
          planet: 'Marte',
          id: model?.id,
          propuesta_valor: model?.propuesta_valor,
          value_proposition: model?.value_proposition,
          key_activities: model?.key_activities,
          revenue_streams: model?.revenue_streams,
          customer_relationships: model?.customer_relationships,
          channels: model?.channels,
          key_partners: model?.key_partners,
          cost_structure: model?.cost_structure,
          customer_segments: model?.customer_segments,
          key_resources: model?.key_resources,
          modelo_negocio: {
            value_proposition: data?.modelo_negocio?.value_proposition,
            revenue_streams: data?.modelo_negocio?.revenue_streams,
            modelo_negocio: data?.modelo_negocio?.modelo_negocio,
          },
          complete,
          label,
          lockedPlanet: lockPlanet,
        });
        setMarte(JSON.parse(stateMarte));
      } else {
        const model = getMarte();
        const stateMarte = JSON.stringify({
          planet: 'Marte',
          id: data?.id,
          propuesta_valor: data?.propuesta_valor,
          value_proposition: data?.value_proposition,
          key_activities: data?.key_activities,
          revenue_streams: data?.revenue_streams,
          customer_relationships: data?.customer_relationships,
          channels: data?.channels,
          key_partners: data?.key_partners,
          cost_structure: data?.cost_structure,
          customer_segments: data?.customer_segments,
          key_resources: data?.key_resources,
          modelo_negocio: {
            value_proposition: model?.modelo_negocio?.value_proposition,
            revenue_streams: model?.modelo_negocio?.revenue_streams,
            modelo_negocio: model?.modelo_negocio?.modelo_negocio,
          },
          complete,
          label,
          lockedPlanet: lockPlanet,
        });
        setMarte(JSON.parse(stateMarte));
      }
    } catch (error) {
      console.log('Exception error manage project', error);
      return {};
    }
  };

  return {
    marteGetProjectById,
    marteCreateProject,
    marteCreateProjectBussines,
    getModelBussines,
    projectMarte,
  };
};

export default useEventsMarte;
