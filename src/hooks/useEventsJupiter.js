import { shallow } from 'zustand/shallow';

// Context
import useAuth from '@Auth/userAuth';

// Store
import { jupiterStore } from '@Store/jupiter';
import { lunaStore } from '@Store/luna';

// Services
import {
  getProjectJupiter,
  getNombresJupiter,
  createJupiterProyect,
  createJupiterNombres,
  createJupiterMarca,
  getMarcaJupiter,
} from '@Service/jupiter.service';

// Helpers
import { statusPlanet } from '@Helpers/constants';

export const useEventJupiter = () => {
  const { contextValue, setLoading } = useAuth();
  const { dataLuna } = lunaStore(
    (state) => ({
      dataLuna: state.dataLuna,
    }),
    shallow
  );

  const { setJupiter, getJupiter, setStateMarcaComplete } = jupiterStore(
    (state) => ({
      setJupiter: state.setJupiter,
      getJupiter: state.getJupiter,
      setStateMarcaComplete: state.setStateMarcaComplete,
    }),
    shallow
  );

  // Obtener el proyecto seleccionado
  const jupiterGetProjectById = async () => {
    try {
      if (contextValue.isLogged()) {
        setLoading(true);
        const res = await getProjectJupiter(dataLuna.id);
        if (res.code === 0) {
          const _jupiter = {
            jupiter: res.data,
          };
          if (res.data.completed) {
            let marcaComplete;
            let marcaStatus;
            if (getJupiter().marcaComplete) {
              marcaComplete = statusPlanet.COMPLETADO;
              marcaStatus = 1;
            } else {
              marcaComplete = statusPlanet.INCOMPLETO;
              marcaStatus = 2;
            }
            projectJupiter(res.Status_planeta, _jupiter, marcaStatus, marcaComplete, false);
            setLoading(false);
            return { data: res.data, code: 0 };
          } else {
            projectJupiter(res.Status_planeta, _jupiter, 2, statusPlanet.INCOMPLETO, false);
            setLoading(false);
            return { data: res.data, code: 0 };
          }
        } else if (res.code < 0) {
          projectJupiter(false, null, 0, statusPlanet.ACCEDER, true);
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

  const jupiterGetNombres = async () => {
    try {
      if (contextValue.isLogged()) {
        setLoading(true);
        const res = await getNombresJupiter(dataLuna.id);
        if (res.code === 0) {
          const _nombres = {
            nombres: res.data,
          };
          if (res.completed) {
            let marcaComplete;
            let marcaStatus;
            if (getJupiter().marcaComplete) {
              marcaComplete = statusPlanet.COMPLETADO;
              marcaStatus = 1;
            } else {
              marcaComplete = statusPlanet.INCOMPLETO;
              marcaStatus = 2;
            }
            projectJupiter('desbloqueado', _nombres, marcaStatus, marcaComplete, false);
            setLoading(false);
            return { data: res.data, code: 0 };
          } else {
            projectJupiter('desbloqueado', _nombres, 2, statusPlanet.INCOMPLETO, false);
            setLoading(false);
            return { data: res.data, code: 0 };
          }
        } else if (res.code < 0) {
          projectJupiter(false, null, 0, statusPlanet.ACCEDER, true);
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

  const jupiterGetMarca = async () => {
    try {
      if (contextValue.isLogged()) {
        setLoading(true);
        const res = await getMarcaJupiter(dataLuna.id);
        if (res.code === 0) {
          const _adjetivos = {
            adjetivos: res.data,
          };
          if (res.completed) {
            setStateMarcaComplete(true);
            projectJupiter('desbloqueado', _adjetivos, 1, statusPlanet.COMPLETADO, false);
            setLoading(false);
            return { data: res.data, code: 0 };
          } else {
            projectJupiter('desbloqueado', _adjetivos, 2, statusPlanet.INCOMPLETO, false);
            setLoading(false);
            return { data: res.data, code: 0 };
          }
        } else if (res.code < 0) {
          projectJupiter(false, null, 0, statusPlanet.ACCEDER, true);
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
  const jupiterCreateProject = async (id, params) => {
    try {
      if (contextValue.isLogged()) {
        setLoading(true);
        const data = {
          caracteristicas: params.caracteristicas,
          adjetivos_calificativos: params.adjetivos_calificativos,
          objetivos: params.objetivos,
          significados: params.significados,
          ideas_nombre: params.ideas_nombre,
        };

        const deleteVoid = {
          caracteristicas: data.caracteristicas.filter(Boolean),
          adjetivos_calificativos: data.adjetivos_calificativos.filter(Boolean),
          objetivos: data.objetivos.filter(Boolean),
          significados: data.significados.filter(Boolean),
          ideas_nombre: data.ideas_nombre.filter(Boolean),
        };

        const objetoSinCamposVacios = {
          ...deleteVoid,
        };

        if (deleteVoid.caracteristicas.length === 0) {
          delete objetoSinCamposVacios.caracteristicas;
        }
        if (deleteVoid.adjetivos_calificativos.length === 0) {
          delete objetoSinCamposVacios.adjetivos_calificativos;
        }
        if (deleteVoid.objetivos.length === 0) {
          delete objetoSinCamposVacios.objetivos;
        }
        if (deleteVoid.significados.length === 0) {
          delete objetoSinCamposVacios.significados;
        }
        if (deleteVoid.ideas_nombre.length === 0) {
          delete objetoSinCamposVacios.ideas_nombre;
        }
        const res = await createJupiterProyect(id, objetoSinCamposVacios);
        if (res.code === 0) {
          const _jupiter = {
            jupiter: res.data,
          };
          if (res.data.completed) {
            let marcaComplete;
            let marcaStatus;
            if (getJupiter().marcaComplete) {
              marcaComplete = statusPlanet.COMPLETADO;
              marcaStatus = 1;
            } else {
              marcaComplete = statusPlanet.INCOMPLETO;
              marcaStatus = 2;
            }
            projectJupiter(res.Status_planeta, _jupiter, marcaStatus, marcaComplete, false);
            setLoading(false);
            return { data: res.data, code: 0 };
          } else {
            projectJupiter(res.Status_planeta, _jupiter, 2, statusPlanet.INCOMPLETO, false);
            setLoading(false);
            return { data: res.data, code: 0 };
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

  // Crear puntos
  const jupiterCreateNombres = async (id, params) => {
    try {
      const obj = JSON.stringify({
        opcion_1: params.opcion_1,
        opcion_2: params.opcion_2,
        opcion_3: params.opcion_3,
      });
      if (contextValue.isLogged()) {
        setLoading(true);
        const res = await createJupiterNombres(id, obj);
        if (res.code === 0) {
          const _nombres = {
            nombres: res.data,
          };
          if (res.data.completed) {
            let marcaComplete;
            let marcaStatus;
            if (getJupiter().marcaComplete) {
              marcaComplete = statusPlanet.COMPLETADO;
              marcaStatus = 1;
            } else {
              marcaComplete = statusPlanet.INCOMPLETO;
              marcaStatus = 2;
            }
            projectJupiter('desbloqueado', _nombres, marcaStatus, marcaComplete, false);
            setLoading(false);
            return { data: res.data, code: 0 };
          } else {
            projectJupiter('desbloqueado', _nombres, 2, statusPlanet.INCOMPLETO, false);
            setLoading(false);
            return { data: res.data, code: 0 };
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

  // Crear marca
  const jupiterCrearMarca = async (id, params) => {
    try {
      if (contextValue.isLogged()) {
        setLoading(true);
        const data = {
          //adjetivos: params.adjetivos.filter(Boolean),
          descripcion_marca: params.descripcion_marca,
        };
        const res = await createJupiterMarca(id, JSON.stringify(data));
        if (res.code === 0) {
          const _adjetivos = {
            adjetivos: res.data,
          };
          if (res.data.completed) {
            setStateMarcaComplete(true);
            projectJupiter('desbloqueado', _adjetivos, 1, statusPlanet.COMPLETADO, false);
            setLoading(false);
            return { data: res.data, code: 0 };
          } else {
            projectJupiter('desbloqueado', _adjetivos, 2, statusPlanet.INCOMPLETO, false);
            setLoading(false);
            return { data: res.data, code: 0 };
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
  const projectJupiter = (lockPlanet, params, complete, label, reset) => {
    try {
      if (reset) {
        const project = JSON.stringify({
          planet: 'Jupiter',
          id: '',
          caracteristicas: [],
          adjetivos_calificativos: [],
          objetivos: [],
          significados: [],
          ideas_nombre: [],
          opcion_1: '',
          opcion_2: '',
          opcion_3: '',
          //adjetivos: [],
          descripcion_marca:'',
          marcaComplete: false,
          complete: 0,
          label: statusPlanet.ACCEDER,
          lockedPlanet: false,
        });
        setJupiter(JSON.parse(project));
        return;
      }

      if (params.jupiter) {
        const project = JSON.stringify({
          planet: 'Jupiter',
          id: params.jupiter.id,
          caracteristicas: params.jupiter.caracteristicas,
          adjetivos_calificativos: params.jupiter.adjetivos_calificativos,
          objetivos: params.jupiter.objetivos,
          significados: params.jupiter.significados,
          ideas_nombre: params.jupiter.ideas_nombre,
          opcion_1: getJupiter().opcion_1 || '',
          opcion_2: getJupiter().opcion_2 || '',
          opcion_3: getJupiter().opcion_3 || '',
          //adjetivos: getJupiter().adjetivos || [],
          descripcion_marca: getJupiter().descripcion_marca || '',
          marcaComplete: getJupiter()?.marcaComplete || false,
          complete,
          label,
          lockedPlanet: lockPlanet,
        });
        setJupiter(JSON.parse(project));
        return;
      }

      if (params.nombres) {
        const project = JSON.stringify({
          planet: 'Jupiter',
          id: params.nombres.id,
          caracteristicas: getJupiter().caracteristicas || [],
          adjetivos_calificativos: getJupiter().adjetivos_calificativos || [],
          objetivos: getJupiter().objetivos || [],
          significados: getJupiter().significados || [],
          ideas_nombre: getJupiter().ideas_nombre || [],
          opcion_1: params.nombres.opcion_1,
          opcion_2: params.nombres.opcion_2,
          opcion_3: params.nombres.opcion_3,
          //adjetivos: getJupiter().adjetivos || [],
          descripcion_marca: getJupiter().descripcion_marca || '',
          marcaComplete: getJupiter()?.marcaComplete || false,
          complete,
          label,
          lockedPlanet: lockPlanet,
        });
        setJupiter(JSON.parse(project));
        return;
      }

      if (params.adjetivos) {
        const project = JSON.stringify({
          planet: 'Jupiter',
          id: params.adjetivos.id,
          caracteristicas: getJupiter().caracteristicas || [],
          adjetivos_calificativos: getJupiter().adjetivos_calificativos || [],
          objetivos: getJupiter().objetivos || [],
          significados: getJupiter().significados || [],
          ideas_nombre: getJupiter().ideas_nombre || [],
          opcion_1: getJupiter().opcion_1 || '',
          opcion_2: getJupiter().opcion_2 || '',
          opcion_3: getJupiter().opcion_3 || '',
          //adjetivos: params.adjetivos.adjetivos,
          descripcion_marca: params.adjetivos.descripcion_marca,
          marcaComplete: getJupiter()?.marcaComplete || false,
          complete,
          label,
          lockedPlanet: lockPlanet,
        });
        setJupiter(JSON.parse(project));
        return;
      }

      const project = JSON.stringify({
        planet: 'Jupiter',
        id: getJupiter().id,
        caracteristicas: getJupiter().caracteristicas || [],
        adjetivos_calificativos: getJupiter().adjetivos_calificativos || [],
        objetivos: getJupiter().objetivos || [],
        significados: getJupiter().significados || [],
        ideas_nombre: getJupiter().ideas_nombre || [],
        opcion_1: getJupiter().opcion_1 || '',
        opcion_2: getJupiter().opcion_2 || '',
        opcion_3: getJupiter().opcion_3 || '',
        //adjetivos: getJupiter().adjetivos || [],
        descripcion_marca: getJupiter().descripcion_marca || '',
        marcaComplete: getJupiter()?.marcaComplete || false,
        complete,
        label,
        lockedPlanet: lockPlanet,
      });
      setJupiter(JSON.parse(project));
    } catch (error) {
      console.log('Exception error manage project', error);
    }
  };

  return {
    jupiterGetProjectById,
    jupiterGetNombres,
    projectJupiter,
    jupiterGetMarca,
    jupiterCreateProject,
    jupiterCreateNombres,
    jupiterCrearMarca,
  };
};
