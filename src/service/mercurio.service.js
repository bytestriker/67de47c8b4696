import { instanceWithRocket } from '@Config/axios';

// Contants
import { LocalStoragePlanets } from '@Helpers/constants';

const headersDefault = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

export const createProjectMercurio = async (items) => {
  try {
    const param = JSON.parse(localStorage.getItem(LocalStoragePlanets.LUNA));
    const body = new URLSearchParams();
    if (items.que_resuelve) {
      body.append('que_resuelve', items.que_resuelve);
    } else {
      body.append('que_resuelve', '');
    }
    if (items.a_quien_resuelve) {
      body.append('a_quien_resuelve', items.a_quien_resuelve);
    } else {
      body.append('a_quien_resuelve', '');
    }
    if (items.a_quien_resuelve_new) {
      body.append('a_quien_resuelve_new', items.a_quien_resuelve_new);
    } else {
      body.append('a_quien_resuelve_new', '');
    }
    const response = await instanceWithRocket.post(
      `/projects/${param.id}/mercurio`,
      body,
      headersDefault
    );
    const { MERCURIO, Status_planeta } = response.data;
    return { data: MERCURIO, code: 0, statusPlanet: Status_planeta };
  } catch (error) {
    const { response } = error;
    return { messageError: response.data.error, code: -1, status: response.status };
  }
};

export const getProjectMercurio = async (id) => {
  try {
    const { data: response } = await instanceWithRocket.get(
      `/projects/${id}/mercurio`,
      headersDefault
    );
    const { original } = response.Mercurio;
    const { data } = original;
    return { data: data, code: 0, statusPlanet: response.Status_planeta };
  } catch (error) {
    const { response } = error;
    return { messageError: response.data.error, code: -1, status: response.status };
  }
};
