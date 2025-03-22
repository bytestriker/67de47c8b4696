import { shallow } from 'zustand/shallow';

// Context
import useAuth from '@Auth/userAuth';

// Store
import { saturnoStore } from '@Store/saturno';
import { lunaStore } from '@Store/luna';

// Services
import { createProyectSaturno, getProjectSaturno } from '@Service/saturno.service';

// Helpers
import { statusPlanet } from '@Helpers/constants';

export const useEventSaturno = () => {
  const { contextValue, setLoading } = useAuth();
  const { dataLuna } = lunaStore(
    (state) => ({
      dataLuna: state.dataLuna,
    }),
    shallow
  );

  const { setSaturno } = saturnoStore(
    (state) => ({
      setSaturno: state.setSaturno,
    }),
    shallow
  );

  // Obtener el proyecto seleccionado
  const saturnoGetProjectById = async () => {
    try {
      if (contextValue.isLogged()) {
        setLoading(true);
        const res = await getProjectSaturno(dataLuna.id);
        if (res.code === 0) {
          if (res.data.completed) {
            projectSaturno(res.Status_planeta, res.data, 1, statusPlanet.COMPLETADO, false);
            setLoading(false);
            return { data: res.data, code: 0 };
          } else {
            projectSaturno(res.Status_planeta, res.data, 2, statusPlanet.INCOMPLETO, false);
            setLoading(false);
            return { data: res.data, code: 0 };
          }
        } else if (res.code < 0) {
          projectSaturno(false, null, 0, statusPlanet.ACCEDER, true);
          setLoading(false);
          return { status: 'error', code: -1 };
        }
      } else {
        return [];
      }
    } catch (error) {
      return { status: 'error', error };
    }
  };

  // Crear proyecto
  const saturnoCreateProject = async (id, params) => {
    try {
      if (contextValue.isLogged()) {
        setLoading(true);
        // elimina campos vacios del array
        const deleteVoid = {
          ...params,
          awarenesses: params.awarenesses.filter(Boolean),
          considerations: params.considerations.filter(Boolean),
          purchases: params.purchases.filter(Boolean),
          retentions: params.retentions.filter(Boolean),
        };
        const objetoSinCamposVacios = {
          ...deleteVoid,
        };

        if (deleteVoid.awarenesses.length === 0) {
          delete objetoSinCamposVacios.awarenesses;
        }

        if (deleteVoid.considerations.length === 0) {
          delete objetoSinCamposVacios.considerations;
        }

        if (deleteVoid.purchases.length === 0) {
          delete objetoSinCamposVacios.purchases;
        }

        if (deleteVoid.retentions.length === 0) {
          delete objetoSinCamposVacios.retentions;
        }

        const res = await createProyectSaturno(id, objetoSinCamposVacios);
        if (res.code === 0) {
          if (res.data.completed) {
            projectSaturno(res.Status_planeta, res.data, 1, statusPlanet.COMPLETADO, false);
            setLoading(false);
            return { status: 'OK' };
          } else {
            projectSaturno(res.Status_planeta, res.data, 2, statusPlanet.INCOMPLETO, false);
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

  // Manejo de estado del objeto y proyecto saturno
  const projectSaturno = (lockPlanet, params, complete, label, reset) => {
    try {
      if (reset) {
        const project = JSON.stringify({
          planet: 'Saturno',
          id: '',
          awarenesses: [],
          considerations: [],
          purchases: [],
          retentions: [],
          complete: 0,
          label: statusPlanet.ACCEDER,
          lockedPlanet: false,
        });
        setSaturno(JSON.parse(project));
        return;
      }

      if (params.awarenesses.length === 0) {
        params.awarenesses = [];
      }

      const project = JSON.stringify({
        planet: 'Saturno',
        id: params.id,
        awarenesses: params.awarenesses,
        considerations: params.considerations,
        purchases: params.purchases,
        retentions: params.retentions,
        complete,
        label,
        lockedPlanet: lockPlanet,
      });
      setSaturno(JSON.parse(project));
    } catch (error) {
      console.log('Exception error manage project', error);
    }
  };

  return {
    projectSaturno,
    saturnoCreateProject,
    saturnoGetProjectById,
  };
};
