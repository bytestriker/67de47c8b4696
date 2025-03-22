import { shallow } from 'zustand/shallow';

// Context
import useAuth from '@Auth/userAuth';

// Store
import { venusStore } from '@Store/venus';
import { lunaStore } from '@Store/luna';

// Services
import {
  getProjectVenus,
  getConclusionFO,
  getBuyerPersona,
  createProyectVenus,
  createConclusionFO,
  createConclusionOD,
  getConclusionDA,
  createBuyerPersona,
  getConclusionFA,
  createConclusionFA,
  getConclusionDEAM,
  createConclusionDEAM,
} from '@Service/venus.service';

// Helpers
import { statusPlanet } from '@Helpers/constants';

export const useEventsVenus = () => {
  const { contextValue, setLoading } = useAuth();
  const { getLuna } = lunaStore(
    (state) => ({
      getLuna: state.getLuna,
    }),
    shallow
  );

  // Store de venus
  const { setStateVenus, setBuyerComplete, getVenus } = venusStore(
    (state) => ({
      setStateVenus: state.setVenus,
      setBuyerComplete: state.setBuyerComplete,
      getVenus: state.getVenus,
    }),
    shallow
  );

  // Obtener el proyecto seleccionado
  const venusGetProjectById = async () => {
    try {
      if (contextValue.isLogged()) {
        setLoading(true);
        const res = await getProjectVenus(getLuna().id);
        if (res.code === 0) {
          if (res.data.completed) {
            const params = {
              project: res.data,
            };
            let buyerComplete;
            let buyerStatus;
            if (getVenus().buyerComplete) {
              buyerComplete = statusPlanet.COMPLETADO;
              buyerStatus = 1;
            } else {
              buyerComplete = statusPlanet.INCOMPLETO;
              buyerStatus = 2;
            }
            projectVenus(res.Status_planeta, params, buyerStatus, buyerComplete, false);
            setLoading(false);
            return { data: res.data, code: 0 };
          } else {
            const params = {
              project: res.data,
            };
            projectVenus(res.Status_planeta, params, 2, statusPlanet.INCOMPLETO, false);
            setLoading(false);
            return { data: res.data, code: 0 };
          }
        } else if (res.code < 0) {
          projectVenus(false, null, 0, statusPlanet.ACCEDER, true);
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

  // Obtener el proyecto foda 1
  const venusConclusionFO = async () => {
    try {
      if (contextValue.isLogged()) {
        const res = await getConclusionFO(getLuna().id);
        if (res.code === 0) {
          if (res.data.completed) {
            let buyerComplete;
            let buyerStatus;
            if (getVenus().buyerComplete) {
              buyerComplete = statusPlanet.COMPLETADO;
              buyerStatus = 1;
            } else {
              buyerComplete = statusPlanet.INCOMPLETO;
              buyerStatus = 2;
            }
            const params = {
              foda_1: res.data,
            };
            projectVenus('desbloqueado', params, buyerStatus, buyerComplete, false);
            setLoading(false);
            return { data: res.data, code: 0 };
          } else {
            const params = {
              foda_1: res.data,
            };
            projectVenus('desbloqueado', params, 2, statusPlanet.INCOMPLETO, false);
            setLoading(false);
            return { data: res.data, code: 0 };
          }
        } else if (res.code < 0) {
          projectVenus('desbloqueado', null, 0, statusPlanet.ACCEDER, true);
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

  // Obtener el proyecto foda 2
  const venusConclusionDA = async () => {
    try {
      if (contextValue.isLogged()) {
        const res = await getConclusionDA(getLuna().id);
        if (res.code === 0) {
          if (res.data.completed) {
            const params = {
              foda_2: res.data,
            };
            let buyerComplete;
            let buyerStatus;
            if (getVenus().buyerComplete) {
              buyerComplete = statusPlanet.COMPLETADO;
              buyerStatus = 1;
            } else {
              buyerComplete = statusPlanet.INCOMPLETO;
              buyerStatus = 2;
            }
            projectVenus('desbloqueado', params, buyerStatus, buyerComplete, false);
            setLoading(false);
            return { data: res.data, code: 0 };
          } else {
            const params = {
              foda_2: res.data,
            };
            projectVenus('desbloqueado', params, 2, statusPlanet.INCOMPLETO, false);
            setLoading(false);
            return { data: res.data, code: 0 };
          }
        } else if (res.code < 0) {
          projectVenus('desbloqueado', null, 0, statusPlanet.ACCEDER, true);
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

  // Obtener el proyecto foda 3
  const venusConclusionFA = async () => {
    try {
      if (contextValue.isLogged()) {
        const res = await getConclusionFA(getLuna().id);
        if (res.code === 0) {
          if (res.data.completed) {
            const params = {
              foda_3: res.data,
            };
            let buyerComplete;
            let buyerStatus;
            if (getVenus().buyerComplete) {
              buyerComplete = statusPlanet.COMPLETADO;
              buyerStatus = 1;
            } else {
              buyerComplete = statusPlanet.INCOMPLETO;
              buyerStatus = 2;
            }
            projectVenus('desbloqueado', params, buyerStatus, buyerComplete, false);
            setLoading(false);
            return { data: res.data, code: 0 };
          } else {
            const params = {
              foda_3: res.data,
            };
            projectVenus('desbloqueado', params, 2, statusPlanet.INCOMPLETO, false);
            setLoading(false);
            return { data: res.data, code: 0 };
          }
        } else if (res.code < 0) {
          projectVenus('desbloqueado', null, 0, statusPlanet.ACCEDER, true);
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

  // Obtener el proyecto foda 4
  const venusConclusionDEAM = async () => {
    try {
      if (contextValue.isLogged()) {
        const res = await getConclusionDEAM(getLuna().id);
        if (res.code === 0) {
          if (res.data.completed) {
            const params = {
              foda_4: res.data,
            };
            let buyerComplete;
            let buyerStatus;
            if (getVenus().buyerComplete) {
              buyerComplete = statusPlanet.COMPLETADO;
              buyerStatus = 1;
            } else {
              buyerComplete = statusPlanet.INCOMPLETO;
              buyerStatus = 2;
            }
            projectVenus('desbloqueado', params, buyerStatus, buyerComplete, false);
            setLoading(false);
            return { data: res.data, code: 0 };
          } else {
            const params = {
              foda_4: res.data,
            };
            projectVenus('desbloqueado', params, 2, statusPlanet.INCOMPLETO, false);
            setLoading(false);
            return { data: res.data, code: 0 };
          }
        } else if (res.code < 0) {
          projectVenus('desbloqueado', null, 0, statusPlanet.ACCEDER, true);
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

  // Obtener el proyecto fbuyer persona
  const venusGetBuyerPersona = async () => {
    try {
      if (contextValue.isLogged()) {
        const res = await getBuyerPersona(getLuna().id);
        if (res.code === 0) {
          if (res.completed) {
            const params = {
              buyer: res.data,
            };
            setBuyerComplete(true);
            projectVenus('desbloqueado', params, 1, statusPlanet.COMPLETADO, false);
            setLoading(false);
            return { code: 0, data: res.data };
          } else {
            const params = {
              buyer: res.data,
            };
            projectVenus('desbloqueado', params, 2, statusPlanet.INCOMPLETO, false);
            setLoading(false);
            return { code: 0, data: res.data };
          }
        } else if (res.code < 0) {
          setLoading(false);
          console.log('error create venus');
          return { code: -1, error: res };
        }
      } else {
        return [];
      }
    } catch (error) {
      return { status: 'error', error };
    }
  };

  // Crear proyecto
  const venusCreateProject = async (params) => {
    try {
      if (contextValue.isLogged()) {
        setLoading(true);
        // elimina campos vacios del array
        const deleteVoid = {
          ...params,
          fortalezas: params.fortalezas.filter(Boolean),
          oportunidades: params.oportunidades.filter(Boolean),
          debilidades: params.debilidades.filter(Boolean),
          amenazas: params.amenazas.filter(Boolean),
        };

        const objetoSinCamposVacios = {
          ...deleteVoid,
        };
        if (deleteVoid.fortalezas.length === 0) {
          delete objetoSinCamposVacios.fortalezas;
        }

        if (deleteVoid.oportunidades.length === 0) {
          delete objetoSinCamposVacios.oportunidades;
        }

        if (deleteVoid.debilidades.length === 0) {
          delete objetoSinCamposVacios.debilidades;
        }
        if (deleteVoid.amenazas.length === 0) {
          delete objetoSinCamposVacios.amenazas;
        }
        const res = await createProyectVenus(JSON.stringify(objetoSinCamposVacios), getLuna().id);
        if (res.code === 0) {
          let buyerComplete;
          let buyerStatus;
          if (getVenus().buyerComplete) {
            buyerComplete = statusPlanet.COMPLETADO;
            buyerStatus = 1;
          } else {
            buyerComplete = statusPlanet.INCOMPLETO;
            buyerStatus = 2;
          }
          if (res.data.completed) {
            const params = {
              project: res.data,
            };
            projectVenus('desbloqueado', params, buyerStatus, buyerComplete, false);
            setLoading(false);
            return { data: res.data, code: 0 };
          } else {
            const params = {
              project: res.data,
            };
            projectVenus('desbloqueado', params, buyerStatus, buyerComplete, false);
            setLoading(false);
            return { data: res.data, code: 0 };
          }
        } else if (res.code < 0) {
          projectVenus('desbloqueado', null, 0, statusPlanet.ACCEDER, true);
          setLoading(false);
          return { status: 'error', code: -1 };
        }
      }
    } catch (error) {
      console.log(error);
      return { status: 'error', error };
    }
  };

  // Crear foda1
  const venusCreateFoda1 = async (params) => {
    try {
      if (contextValue.isLogged()) {
        setLoading(true);

        const res = await createConclusionFO(getLuna().id, JSON.stringify(params));
        if (res.code === 0) {
          let buyerComplete;
          let buyerStatus;
          if (getVenus().buyerComplete) {
            buyerComplete = statusPlanet.COMPLETADO;
            buyerStatus = 1;
          } else {
            buyerComplete = statusPlanet.INCOMPLETO;
            buyerStatus = 2;
          }
          if (res.data.completed) {
            const params = {
              foda_1: res.data,
            };
            projectVenus('desbloqueado', params, buyerStatus, buyerComplete, false);
            setLoading(false);
            return { data: res.data, code: 0 };
          } else {
            const params = {
              foda_1: res.data,
            };
            projectVenus('desbloqueado', params, buyerStatus, buyerComplete, false);
            setLoading(false);
            return { data: res.data, code: 0 };
          }
        } else if (res.code < 0) {
          projectVenus('desbloqueado', null, 0, statusPlanet.ACCEDER, true);
          setLoading(false);
          return { status: 'error', code: -1 };
        }
      }
    } catch (error) {
      console.log(error);
      return { status: 'error', error };
    }
  };

  // Crear foda2
  const venusCreateFoda2 = async (params) => {
    try {
      if (contextValue.isLogged()) {
        setLoading(true);
        const res = await createConclusionOD(getLuna().id, JSON.stringify(params));
        if (res.code === 0) {
          let buyerComplete;
          let buyerStatus;
          if (getVenus().buyerComplete) {
            buyerComplete = statusPlanet.COMPLETADO;
            buyerStatus = 1;
          } else {
            buyerComplete = statusPlanet.INCOMPLETO;
            buyerStatus = 2;
          }
          if (res.completed) {
            const params = {
              foda_2: res.data,
            };
            projectVenus('desbloqueado', params, buyerStatus, buyerComplete, false);
            setLoading(false);
            return { code: 0, data: res.data };
          } else {
            const params = {
              foda_2: res.data,
            };
            projectVenus('desbloqueado', params, buyerStatus, buyerComplete, false);
            setLoading(false);
            return { code: 0, data: res.data };
          }
        } else if (res.code < 0) {
          setLoading(false);
          console.log('error create venus');
          return { code: -1, error: res };
        }
      }
    } catch (error) {
      console.log(error);
      return { status: 'error', error };
    }
  };

  // Crear foda3
  const venusCreateFoda3 = async (params) => {
    try {
      if (contextValue.isLogged()) {
        setLoading(true);
        const res = await createConclusionFA(getLuna().id, JSON.stringify(params));

        console.log(res);
        if (res.code === 0) {
          let buyerComplete;
          let buyerStatus;
          if (getVenus().buyerComplete) {
            buyerComplete = statusPlanet.COMPLETADO;
            buyerStatus = 1;
          } else {
            buyerComplete = statusPlanet.INCOMPLETO;
            buyerStatus = 2;
          }
          if (res.completed) {
            const params = {
              foda_3: res.data,
            };
            projectVenus('desbloqueado', params, buyerStatus, buyerComplete, false);
            setLoading(false);
            return { code: 0, data: res.data };
          } else {
            const params = {
              foda_3: res.data,
            };
            projectVenus('desbloqueado', params, buyerStatus, buyerComplete, false);
            setLoading(false);
            return { code: 0, data: res.data };
          }
        } else if (res.code < 0) {
          setLoading(false);
          console.log('error create venus');
          return { code: -1, error: res };
        }
      }
    } catch (error) {
      console.log(error);
      return { status: 'error', error };
    }
  };

  // Crear foda4
  const venusCreateFoda4 = async (params) => {
    try {
      if (contextValue.isLogged()) {
        setLoading(true);
        const res = await createConclusionDEAM(getLuna().id, JSON.stringify(params));

        console.log(res);
        if (res.code === 0) {
          let buyerComplete;
          let buyerStatus;
          if (getVenus().buyerComplete) {
            buyerComplete = statusPlanet.COMPLETADO;
            buyerStatus = 1;
          } else {
            buyerComplete = statusPlanet.INCOMPLETO;
            buyerStatus = 2;
          }
          if (res.completed) {
            const params = {
              foda_4: res.data,
            };
            projectVenus('desbloqueado', params, buyerStatus, buyerComplete, false);
            setLoading(false);
            return { code: 0, data: res.data };
          } else {
            const params = {
              foda_4: res.data,
            };
            projectVenus('desbloqueado', params, buyerStatus, buyerComplete, false);
            setLoading(false);
            return { code: 0, data: res.data };
          }
        } else if (res.code < 0) {
          setLoading(false);
          console.log('error create venus');
          return { code: -1, error: res };
        }
      }
    } catch (error) {
      console.log(error);
      return { status: 'error', error };
    }
  };

  // Crear buyer persona
  const venusCreateBuyerPersona = async (params) => {
    try {
      if (contextValue.isLogged()) {
        setLoading(true);
        const res = await createBuyerPersona(getLuna().id, JSON.stringify(params));
        if (res.code === 0) {
          if (res.completed) {
            const params = {
              buyer: res.data,
            };
            setBuyerComplete(true);
            projectVenus('desbloqueado', params, 1, statusPlanet.COMPLETADO, false);
            setLoading(false);
            return { code: 0, data: res.data };
          } else {
            const params = {
              buyer: res.data,
            };
            projectVenus('desbloqueado', params, 2, statusPlanet.INCOMPLETO, false);
            setLoading(false);
            return { code: 0, data: res.data };
          }
        } else if (res.code < 0) {
          setLoading(false);
          console.log('error create venus');
          return { code: -1, error: res };
        }
      }
    } catch (error) {
      console.log(error);
      return { status: 'error', error };
    }
  };

  // manejo de estado del planeta venus
  const projectVenus = (lockPlanet, data, complete, label, reset) => {
    try {
      if (reset) {
        const project = JSON.stringify({
          planet: 'Venus',
          id: '',
          painpoints: [],
          fortalezas: [],
          oportunidades: [],
          debilidades: [],
          amenazas: [],
          foda_1: {
            fortalezas_oportunidades: [],
            conclusion: '',
          },
          foda_2: {
            oportunidades_debilidades: [],
            conclusion: '',
          },
          foda_3: {
            fortalezas_amenazas: [],
            conclusion: '',
          },
          foda_4: {
            debilidades_amenazas: [],
            conclusion: '',
          },
          buyer: {
            nombre: '',
            frase: '',
            edad: '',
            ubicacion: '',
            profesion: '',
            background: '',
            goals: '',
            motivations: '',
            frustrations: '',
          },
          complete: 0,
          label: statusPlanet.ACCEDER,
          lockedPlanet: false,
        });
        setStateVenus(JSON.parse(project));
        return;
      }

      if (data.project) {
        const project = JSON.stringify({
          planet: 'Venus',
          id: data.project.id,
          painpoints: data.project.painpoints,
          fortalezas: data.project.fortalezas,
          oportunidades: data.project.oportunidades,
          debilidades: data.project.debilidades,
          amenazas: data.project.amenazas,
          foda_1: {
            fortalezas_oportunidades: getVenus().foda_1.fortalezas_oportunidades,
            conclusion: getVenus().foda_1.conclusion,
          },
          foda_2: {
            oportunidades_debilidades: getVenus().foda_2.oportunidades_debilidades,
            conclusion: getVenus().foda_2.conclusion,
          },
          foda_3: {
            fortalezas_amenazas: getVenus().foda_3.fortalezas_amenazas,
            conclusion: getVenus().foda_3.conclusion,
          },
          foda_4: {
            debilidades_amenazas: getVenus().foda_4.debilidades_amenazas,
            conclusion: getVenus().foda_4.conclusion,
          },
          buyer: {
            nombre: getVenus().buyer.nombre || '',
            frase: getVenus().buyer.frase || '',
            edad: getVenus().buyer.edad || '',
            ubicacion: getVenus().buyer.ubicacion || '',
            profesion: getVenus().buyer.profesion || '',
            background: getVenus().buyer.background || '',
            goals: getVenus().buyer.goals || '',
            motivations: getVenus().buyer.motivations || '',
            frustrations: getVenus().buyer.frustrations || '',
          },
          buyerComplete: getVenus()?.buyerComplete || false,
          complete,
          label,
          lockedPlanet: lockPlanet,
        });
        setStateVenus(JSON.parse(project));
        return;
      }
      if (data.foda_1) {
        const project = JSON.stringify({
          planet: 'Venus',
          id: getVenus().id,
          painpoints: getVenus().painpoints,
          fortalezas: getVenus().fortalezas,
          oportunidades: getVenus().oportunidades,
          debilidades: getVenus().debilidades,
          amenazas: getVenus().amenazas,
          foda_1: {
            fortalezas_oportunidades: data.foda_1.fortalezas_oportunidades,
            conclusion: data.foda_1.conclusion,
          },
          foda_2: {
            oportunidades_debilidades: getVenus().foda_2.oportunidades_debilidades || [],
            conclusion: getVenus().foda_2.conclusion || '',
          },
          foda_3: {
            fortalezas_amenazas: getVenus().foda_3.fortalezas_amenazas|| [],
            conclusion: getVenus().foda_3.conclusion || '',
          },
          foda_4: {
            debilidades_amenazas: getVenus().foda_4.debilidades_amenazas|| [],
            conclusion: getVenus().foda_4.conclusion || '',
          },
          buyer: {
            nombre: getVenus().buyer.nombre || '',
            frase: getVenus().buyer.frase || '',
            edad: getVenus().buyer.edad || '',
            ubicacion: getVenus().buyer.ubicacion || '',
            profesion: getVenus().buyer.profesion || '',
            background: getVenus().buyer.background || '',
            goals: getVenus().buyer.goals || '',
            motivations: getVenus().buyer.motivations || '',
            frustrations: getVenus().buyer.frustrations || '',
          },
          buyerComplete: getVenus()?.buyerComplete || false,
          complete,
          label,
          lockedPlanet: lockPlanet,
        });
        setStateVenus(JSON.parse(project));
        return;
      }
      if (data.foda_2) {
        const project = JSON.stringify({
          planet: 'Venus',
          id: getVenus().id,
          painpoints: getVenus().painpoints,
          fortalezas: getVenus().fortalezas,
          oportunidades: getVenus().oportunidades,
          debilidades: getVenus().debilidades,
          amenazas: getVenus().amenazas,
          foda_1: {
            fortalezas_oportunidades: getVenus().foda_1.fortalezas_oportunidades,
            conclusion: getVenus().foda_1.conclusion,
          },
          foda_2: {
            oportunidades_debilidades: data.foda_2.oportunidades_debilidades,
            conclusion: data.foda_2.conclusion,
          },
          foda_3: {
            fortalezas_amenazas: getVenus().foda_3.fortalezas_amenazas,
            conclusion: getVenus().foda_3.conclusion,
          },
          foda_4: {
            debilidades_amenazas: getVenus().foda_4.debilidades_amenazas,
            conclusion: getVenus().foda_4.conclusion,
          },
          buyer: {
            nombre: getVenus().buyer.nombre || '',
            frase: getVenus().buyer.frase || '',
            edad: getVenus().buyer.edad || '',
            ubicacion: getVenus().buyer.ubicacion || '',
            profesion: getVenus().buyer.profesion || '',
            background: getVenus().buyer.background || '',
            goals: getVenus().buyer.goals || '',
            motivations: getVenus().buyer.motivations || '',
            frustrations: getVenus().buyer.frustrations || '',
          },
          buyerComplete: getVenus()?.buyerComplete || false,
          complete,
          label,
          lockedPlanet: lockPlanet,
        });
        setStateVenus(JSON.parse(project));
        return;
      }
      if (data.foda_3) {
        const project = JSON.stringify({
          planet: 'Venus',
          id: getVenus().id,
          painpoints: getVenus().painpoints,
          fortalezas: getVenus().fortalezas,
          oportunidades: getVenus().oportunidades,
          debilidades: getVenus().debilidades,
          amenazas: getVenus().amenazas,
          foda_1: {
            fortalezas_oportunidades: getVenus().foda_1.fortalezas_oportunidades,
            conclusion: getVenus().foda_1.conclusion,
          },
          foda_2: {
            oportunidades_debilidades: getVenus().foda_2.oportunidades_debilidades,
            conclusion: getVenus().foda_2.conclusion,
          },
          foda_3: {
            fortalezas_amenazas: data.foda_3.fortalezas_amenazas,
            conclusion: data.foda_3.conclusion,
          },
          foda_4: {
            debilidades_amenazas: getVenus().foda_4.debilidades_amenazas,
            conclusion: getVenus().foda_4.conclusion,
          },
          buyer: {
            nombre: getVenus().buyer.nombre || '',
            frase: getVenus().buyer.frase || '',
            edad: getVenus().buyer.edad || '',
            ubicacion: getVenus().buyer.ubicacion || '',
            profesion: getVenus().buyer.profesion || '',
            background: getVenus().buyer.background || '',
            goals: getVenus().buyer.goals || '',
            motivations: getVenus().buyer.motivations || '',
            frustrations: getVenus().buyer.frustrations || '',
          },
          buyerComplete: getVenus()?.buyerComplete || false,
          complete,
          label,
          lockedPlanet: lockPlanet,
        });
        setStateVenus(JSON.parse(project));
        return;
      }
      if (data.foda_4) {
        const project = JSON.stringify({
          planet: 'Venus',
          id: getVenus().id,
          painpoints: getVenus().painpoints,
          fortalezas: getVenus().fortalezas,
          oportunidades: getVenus().oportunidades,
          debilidades: getVenus().debilidades,
          amenazas: getVenus().amenazas,
          foda_1: {
            fortalezas_oportunidades: getVenus().foda_1.fortalezas_oportunidades,
            conclusion: getVenus().foda_1.conclusion,
          },
          foda_2: {
            oportunidades_debilidades: getVenus().foda_2.oportunidades_debilidades,
            conclusion: getVenus().foda_2.conclusion,
          },
          foda_3: {
            fortalezas_amenazas: getVenus().foda_3.fortalezas_amenazas,
            conclusion: getVenus().foda_3.conclusion,
          },
          foda_4: {
            debilidades_amenazas: data.foda_4.debilidades_amenazas,
            conclusion: data.foda_4.conclusion,
          },
          buyer: {
            nombre: getVenus().buyer.nombre || '',
            frase: getVenus().buyer.frase || '',
            edad: getVenus().buyer.edad || '',
            ubicacion: getVenus().buyer.ubicacion || '',
            profesion: getVenus().buyer.profesion || '',
            background: getVenus().buyer.background || '',
            goals: getVenus().buyer.goals || '',
            motivations: getVenus().buyer.motivations || '',
            frustrations: getVenus().buyer.frustrations || '',
          },
          buyerComplete: getVenus()?.buyerComplete || false,
          complete,
          label,
          lockedPlanet: lockPlanet,
        });
        setStateVenus(JSON.parse(project));
        return;
      }
      if (data.buyer) {
        const project = JSON.stringify({
          planet: 'Venus',
          id: getVenus().id,
          painpoints: getVenus().painpoints,
          fortalezas: getVenus().fortalezas,
          oportunidades: getVenus().oportunidades,
          debilidades: getVenus().debilidades,
          amenazas: getVenus().amenazas,
          foda_1: {
            fortalezas_oportunidades: getVenus().foda_1.fortalezas_oportunidades || [],
            conclusion: getVenus().foda_1.conclusion || '',
          },
          foda_2: {
            oportunidades_debilidades: getVenus().foda_2.oportunidades_debilidades || [],
            conclusion: getVenus().foda_2.conclusion || '',
          },
          foda_3: {
            fortalezas_amenazas: getVenus().foda_3.fortalezas_amenazas || [],
            conclusion: getVenus().foda_3.conclusion || '',
          },
          foda_4: {
            debilidades_amenazas: getVenus().foda_4.debilidades_amenazas || [],
            conclusion: getVenus().foda_4.conclusion || '',
          },
          buyer: {
            nombre: data.buyer[0].nombre,
            frase: data.buyer[0].frase,
            edad: data.buyer[0].edad,
            ubicacion: data.buyer[0].ubicacion,
            profesion: data.buyer[0].profesion,
            background: data.buyer[0].background,
            goals: data.buyer[0].goals,
            motivations: data.buyer[0].motivations,
            frustrations: data.buyer[0].frustrations,
          },
          buyerComplete: getVenus().buyerComplete,
          
          
          complete,
          label,
          lockedPlanet: lockPlanet,
        });
        setStateVenus(JSON.parse(project));
        return;
      }
      const foda = JSON.stringify({
        planet: 'Venus',
        id: getVenus().id || '',
        painpoints: getVenus().painpoints || [],
        fortalezas: getVenus().fortalezas || [],
        oportunidades: getVenus().oportunidades || [],
        debilidades: getVenus().debilidades || [],
        amenazas: getVenus().amenazas || [],
        foda_1: {
          fortalezas_oportunidades: getVenus().foda_1.fortalezas_oportunidades || [],
          conclusion: getVenus().foda_1.conclusion || '',
        },
        foda_2: {
          oportunidades_debilidades: getVenus().foda_2.oportunidades_debilidades || [],
          conclusion: getVenus().foda_2.conclusion || '',
        },
        foda_3: {
          fortalezas_amenazas: getVenus().foda_3.fortalezas_amenazas || [],
          conclusion: getVenus().foda_3.conclusion || '',
        },
        foda_4: {
          debilidades_amenazas: getVenus().foda_4.debilidades_amenazas || [],
          conclusion: getVenus().foda_4.conclusion || '',
        },
        buyer: {
          nombre: getVenus().buyer.nombre || '',
          frase: getVenus().buyer.frase || '',
          edad: getVenus().buyer.edad || '',
          ubicacion: getVenus().buyer.ubicacion || '',
          profesion: getVenus().buyer.profesion || '',
          background: getVenus().buyer.background || '',
          goals: getVenus().buyer.goals || '',
          motivations: getVenus().buyer.motivations || '',
          frustrations: getVenus().buyer.frustrations || '',
        },
        buyerComplete: getVenus()?.buyerComplete || false,
        complete,
        label,
        lockedPlanet: lockPlanet,
      });

      setStateVenus(JSON.parse(foda));
    } catch (error) {
      console.log('Exception error manage project', error);
    }
  };

  return {
    venusGetProjectById,
    venusCreateProject,
    venusConclusionFO,
    venusCreateFoda1,
    venusCreateFoda2,
    venusConclusionDA,
    venusGetBuyerPersona,
    venusCreateBuyerPersona,
    projectVenus,
    venusCreateFoda3,
    venusConclusionFA,
    venusCreateFoda4,
    venusConclusionDEAM,
  };
};
