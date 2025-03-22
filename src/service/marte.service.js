import { instanceWithRocket } from '@Config/axios';

const headersDefault = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

const headersJson = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getProjectMarte = async (id) => {
  try {
    const response = await instanceWithRocket.get(`/projects/${id}/marte`, headersDefault);
    const { Status_planeta, Marte } = response.data;
    const { data } = Marte.original;
    return { data: data, Status_planeta: Status_planeta, code: 0 };
  } catch (error) {
    const { response } = error;
    return { messageError: response.data.error, status: response.status, code: -1 };
  }
};

export const createProyectMarte = async (id, data) => {
  try {
    const response = await instanceWithRocket.post(`/projects/${id}/marte`, data, headersJson);
    const { Status_planeta, MARTE } = response.data;
    return { data: MARTE, Status_planeta: Status_planeta, code: 0 };
  } catch (error) {
    const { response } = error;
    return { messageError: response.data.error, status: response.status, code: -1 };
  }
};

export const createBussinesMarte = async (id, params) => {
  try {
    const response = await instanceWithRocket.post(
      `/projects/${id}/marte/modelo-negocios`,
      params,
      headersJson
    );
    const { data } = response.data;
    return { data: data, code: 0 };
  } catch (error) {
    const { response } = error;
    return { messageError: response.data.error, status: response.status, code: -1 };
  }
};

export const getBussinesMarte = async (id) => {
  try {
    const response = await instanceWithRocket.get(
      `/projects/${id}/marte/modelo-negocios`,
      headersDefault
    );
    const { data } = response.data;
    return { data: data, code: 0 };
  } catch (error) {
    const { response } = error;
    return { messageError: response.data.error, status: response.status, code: -1 };
  }
};
