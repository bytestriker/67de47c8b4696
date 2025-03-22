import useAuth from '@Auth/userAuth';
// Hooks
import { useEventsLuna } from '@Hooks/useEventsLuna';
import { useEventsMercurio } from '@Hooks/useEventsMercurio';
import { useEventsMarte } from '@Hooks/useEventsMarte';
import { useEventSaturno } from '@Hooks/useEventSaturno';
import { useEventsVenus } from '@Hooks/useEventVenus';
import { useEventsUrano } from '@Hooks/useEventsUrano';
import { useEventJupiter } from '@Hooks/useEventsJupiter';

// Services
import { getProjectMercurio } from '@Service/mercurio.service';
import { getProjectMarte, getBussinesMarte } from '@Service/marte.service';
import { getProjectById } from '@Service/entries';
import { getProjectSaturno } from '@Service/saturno.service';
import { getProjectVenus, getBuyerPersona } from '@Service/venus.service';
import { getProjectUrano } from '@Service/urano.service';
import { getProjectJupiter, getMarcaJupiter } from '@Service/jupiter.service';

// Helpers
import { handleSelectLink } from '@Helpers/api_utils';
import { statusPlanet } from '@Helpers/constants';

export const useGetProjects = () => {
  const { contextValue, setLoading } = useAuth();
  const { manageProject } = useEventsLuna();
  const { projectMercurio } = useEventsMercurio();
  const { projectVenus } = useEventsVenus();
  const { projectMarte } = useEventsMarte();
  const { projectSaturno } = useEventSaturno();
  const { projectUrano } = useEventsUrano();
  const { projectJupiter } = useEventJupiter();

  // Obtener el proyecto seleccionado
  const GetProjectMain = async (id) => {
    try {
      if (contextValue.isLogged()) {
        const main = await getProjectById(id)
          .then((res) => {
            handleSelectLink(id);
            const data = res.data.data;
            const { completado } = data;
            if (completado) {
              manageProject(data, 1, statusPlanet.COMPLETADO, false);
              return { status: 'OK', message: 'Luna completado' };
            } else {
              manageProject(data, 2, statusPlanet.INCOMPLETO, false);
              return { status: 'OK', message: 'Luna incompleto' };
            }
          })
          .catch((err) => {
            console.log('ERROR:', err);
            return [];
          });
        return main;
      } else {
        console.log('Not ID, Not Login');
        return [];
      }
    } catch (error) {
      console.log('Exception error get project-id', error);
      return { status: 'error', message: 'luna error', error };
    }
  };

  const GetProjectMercurio = async (idLuna) => {
    try {
      if (contextValue.isLogged()) {
        const res = await getProjectMercurio(idLuna);
        if (res.code === 0) {
          if (res.data.completed) {
            projectMercurio(res.statusPlanet, res.data, 1, statusPlanet.COMPLETADO, false);
            return { status: 'OK', message: 'Mercurio completado' };
          } else {
            projectMercurio(res.statusPlanet, res.data, 2, statusPlanet.INCOMPLETO, false);
            return { status: 'OK', message: 'Mercurio incompleto' };
          }
        } else if (res.code < 0) {
          projectMercurio(false, null, 0, statusPlanet.ACCEDER, true);
          return { status: 'error', message: 'Mercurio error', res };
        }
      } else {
        projectMercurio(false, null, 0, statusPlanet.ACCEDER, true);
        return [];
      }
    } catch (error) {
      projectMercurio(false, null, 0, statusPlanet.ACCEDER, true);
      return { status: 'error', message: 'mercurio error', error };
    }
  };

  const GetProjectMarte = async (idLuna) => {
    try {
      if (contextValue.isLogged()) {
        const marte = await getProjectMarte(idLuna)
          .then((res) => {
            if (res.code === 0) {
              if (res.data.completed) {
                projectMarte(res.Status_planeta, res.data, 1, statusPlanet.COMPLETADO, false);
                GetBussinestMarte(idLuna, res.Status_planeta);
                return { status: 'OK', message: 'Marte completado' };
              } else {
                projectMarte(res.Status_planeta, res.data, 2, statusPlanet.INCOMPLETO, false);
                GetBussinestMarte(idLuna, res.Status_planeta);
                return { status: 'OK', message: 'Marte incompleto' };
              }
            } else if (res.code < 0) {
              projectMarte(false, null, 0, statusPlanet.ACCEDER, true);
              return { status: 'error', message: 'Marte error', res };
            }
          })
          .catch((error) => {
            return { status: 'catch error', error: error };
          });

        return { marte };
      } else {
        return [];
      }
    } catch (error) {
      return { status: 'error', error };
    }
  };

  const GetBussinestMarte = async (idLuna, bloqueo) => {
    const bussines = await getBussinesMarte(idLuna)
      .then((negocio) => {
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
            return { status: 'OK', message: 'Marte bussines completado' };
          } else {
            projectMarte(bloqueo, modeloNegocio, 2, statusPlanet.INCOMPLETO, false);
            return { status: 'OK', message: 'Marte bussines incompleto' };
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
          return { status: 'error', message: 'Marte bussines error', res };
        }
      })
      .catch((error) => {
        return { status: 'catch error', error: error };
      });
    return { bussines };
  };

  const GetProjectSaturno = async (idLuna) => {
    try {
      if (contextValue.isLogged()) {
        const res = await getProjectSaturno(idLuna);
        if (res.code === 0) {
          if (res.data.completed) {
            projectSaturno(res.Status_planeta, res.data, 1, statusPlanet.COMPLETADO, false);
            return { status: 'OK', message: 'Saturno completado' };
          } else {
            projectSaturno(res.Status_planeta, res.data, 2, statusPlanet.INCOMPLETO, false);
            return { status: 'OK', message: 'Saturno incompleto' };
          }
        } else if (res.code < 0) {
          projectSaturno(false, null, 0, statusPlanet.ACCEDER, true);
          return { status: 'error', message: 'Saturno error', res };
        }
      } else {
        projectSaturno(false, null, 0, statusPlanet.ACCEDER, true);
        return [];
      }
    } catch (error) {
      projectSaturno(false, null, 0, statusPlanet.ACCEDER, true);
      return { status: 'error', message: 'Saturno error', res };
    }
  };

  const GetProjectVenus = async (idLuna) => {
    try {
      if (contextValue.isLogged()) {
        const res = await getProjectVenus(idLuna);
        if (res.code === 0) {
          const buyer = await getBuyerPersona(idLuna);
          if (res.data.completed && buyer.completed) {
            const params = {
              project: res.data,
            };
            projectVenus(res.Status_planeta, params, 1, statusPlanet.COMPLETADO, false);
            return { status: 'OK', message: 'Venus completado' };
          } else {
            const params = {
              project: res.data,
            };
            projectVenus(res.Status_planeta, params, 2, statusPlanet.INCOMPLETO, false);
            return { status: 'OK', message: 'Venus incompleto' };
          }
        } else if (res.code < 0) {
          projectVenus(false, null, 0, statusPlanet.ACCEDER, true);
          return { status: 'OK', message: 'Venus error' };
        }
      } else {
        projectVenus(false, null, 0, statusPlanet.ACCEDER, true);
        return [];
      }
    } catch (error) {
      projectVenus(false, null, 0, statusPlanet.ACCEDER, true);
      return { status: 'error', message: 'Venus error', res };
    }
  };

  const GetProjectUrano = async (idLuna) => {
    try {
      if (contextValue.isLogged()) {
        const res = await getProjectUrano(idLuna);
        if (res.code === 0) {
          if (res.data.completed) {
            projectUrano(res.statusPlanet, res.data, 1, statusPlanet.COMPLETADO, false);
            return { status: 'OK', message: 'Urano completado' };
          } else {
            projectUrano(res.statusPlanet, res.data, 2, statusPlanet.INCOMPLETO, false);
            return { status: 'OK', message: 'Urano incompleto' };
          }
        } else if (res.code < 0) {
          projectUrano(false, null, 0, statusPlanet.ACCEDER, true);
          return { status: 'OK', message: 'Urano error' };
        }
      } else {
        projectUrano(false, null, 0, statusPlanet.ACCEDER, true);
        return [];
      }
    } catch (error) {
      projectUrano(false, null, 0, statusPlanet.ACCEDER, true);
      return { status: 'error', message: 'Urano error', res };
    }
  };

  const GetProjectJupiter = async (idLuna) => {
    try {
      if (contextValue.isLogged()) {
        const res = await getProjectJupiter(idLuna);
        if (res.code === 0) {
          const marca = await getMarcaJupiter(idLuna);
          const _jupiter = {
            jupiter: res.data,
          };
          if (res.data.completed && marca.completed) {
            projectJupiter(res.Status_planeta, _jupiter, 1, statusPlanet.COMPLETADO, false);
            return { status: 'OK', message: 'Jupiter completado' };
          } else {
            projectJupiter(res.Status_planeta, _jupiter, 2, statusPlanet.INCOMPLETO, false);
            return { status: 'OK', message: 'Jupiter incompleto' };
          }
        } else if (res.code < 0) {
          projectJupiter(false, null, 0, statusPlanet.ACCEDER, true);
          return { status: 'OK', message: 'Jupiter error' };
        }
      } else {
        projectJupiter(false, null, 0, statusPlanet.ACCEDER, true);
        return [];
      }
    } catch (error) {
      projectJupiter(false, null, 0, statusPlanet.ACCEDER, true);
      return { status: 'error', message: 'Jupiter error', res };
    }
  };

  // Procesa los sertvicios para obtener la consulta por planeta
  const ProcessProjects = async (idProject) => {
    setLoading(true);
    await Promise.all([
      GetProjectMain(idProject),
      GetProjectMercurio(idProject),
      GetProjectVenus(idProject),
      GetProjectMarte(idProject),
      GetProjectSaturno(idProject),
      GetProjectUrano(idProject),
      GetProjectJupiter(idProject),
    ])
      .then((values) => {
        console.log('Response ProcessProjects.');
      })
      .catch((error) => {
        console.log('Catch error ProcessProjects.', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    ProcessProjects,
  };
};

export default useGetProjects;
