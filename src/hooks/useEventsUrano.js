import { shallow } from 'zustand/shallow';

// Context
import useAuth from '@Auth/userAuth';

// Store
import { uranoStore } from '@Store/urano';
import { lunaStore } from '@Store/luna';

// Services
import { getProjectUrano } from '@Service/urano.service';

// Helpers
import { statusPlanet } from '@Helpers/constants';

export const useEventsUrano = () => {
  const { contextValue, setLoading } = useAuth();

  // Store de urano
  const { geUrano, setUrano } = uranoStore(
    (state) => ({
      geUrano: state.geUrano,
      setUrano: state.setUrano,
    }),
    shallow
  );
  const { getLuna } = lunaStore(
    (state) => ({
      getLuna: state.getLuna,
    }),
    shallow
  );

  // Obtener el proyecto seleccionado
  const uranoGetProjectById = async () => {
    try {
      if (contextValue.isLogged()) {
        setLoading(true);
        const res = await getProjectUrano(getLuna().id);
        if (res.code === 0) {
          if (res.data.completed) {
            projectUrano(res.statusPlanet, res.data, 1, statusPlanet.COMPLETADO, false);
            setLoading(false);
            return { data: res.data, code: 0 };
          } else {
            projectUrano(res.statusPlanet, res.data, 2, statusPlanet.INCOMPLETO, false);
            setLoading(false);
            return { data: res.data, code: 0 };
          }
        } else if (res.code < 0) {
          projectUrano(false, null, 0, statusPlanet.ACCEDER, true);
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

  // manejo de estado del planeta marte
  const projectUrano = (lockPlanet, data, complete, label, reset) => {
    try {
      if (reset) {
        const project = JSON.stringify({
          planet: 'Urano',
          id: '',
          prototipo: '',
          pretotipo: '',
          pl: [],
          proveedores: '',
          complete: 0,
          label: statusPlanet.ACCEDER,
          lockedPlanet: false,
        });
        setUrano(JSON.parse(project));
        return;
      }

      const project = JSON.stringify({
        planet: 'Urano',
        id: data.id,
        prototipo: data.prototipo,
        pretotipo: data.pretotipo,
        pl: data.pl,
        proveedores: data.proveedores,
        complete,
        label,
        lockedPlanet: lockPlanet,
      });
      setUrano(JSON.parse(project));
    } catch (error) {
      console.log('Exception error manage project', error);
    }
  };

  return {
    uranoGetProjectById,
    projectUrano,
  };
};
