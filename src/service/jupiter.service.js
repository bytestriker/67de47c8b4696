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

export const getProjectJupiter = async (id) => {
  try {
    const response = await instanceWithRocket.get(`/projects/${id}/jupiter`, headersDefault);
    const { Status_planeta, jupiter } = response.data;
    const { data } = jupiter.original;
    return { data: data, Status_planeta: Status_planeta, code: 0 };
  } catch (error) {
    const { response } = error;
    return { messageError: response.data.error, status: response.status, code: -1 };
  }
};

export const getNombresJupiter = async (id) => {
  try {
    const response = await instanceWithRocket.get(
      `/projects/${id}/jupiter/nombres`,
      headersDefault
    );
    const { data } = response.data;
    return { data: data, completed: data.completed, code: 0 };
  } catch (error) {
    const { response } = error;
    return { messageError: response.data.error, status: response.status, code: -1 };
  }
};

export const getMarcaJupiter = async (id) => {
  try {
    const response = await instanceWithRocket.get(
      `/projects/${id}/jupiter/personalidad-marca`,
      headersDefault
    );
    const { data } = response.data;
    return { data: data, completed: data.completed, code: 0 };
  } catch (error) {
    const { response } = error;
    return { messageError: response.data.error, status: response.status, code: -1 };
  }
};

export const createJupiterProyect = async (id, params) => {
  try {
    const response = await instanceWithRocket.post(`/projects/${id}/jupiter`, params, headersJson);
    const { Status_planeta, JUPITER } = response.data;
    return { data: JUPITER, code: 0, Status_planeta: Status_planeta };
  } catch (error) {
    const { response } = error;
    return { messageError: response.data.error, code: -1, status: response.status };
  }
};

export const createJupiterNombres = async (id, params) => {
  try {
    const response = await instanceWithRocket.post(
      `/projects/${id}/jupiter/nombres`,
      params,
      headersJson
    );
    const { data } = response.data;
    return { data: data, completed: data.completed, code: 0 };
  } catch (error) {
    const { response } = error;
    return { messageError: response.data.error, status: response.status, code: -1 };
  }
};

export const createJupiterMarca = async (id, body) => {
  try {
    const response = await instanceWithRocket.post(
      `/projects/${id}/jupiter/personalidad-marca`,
      body,
      headersJson
    );
    const { data } = response.data;
    return { data: data, completed: data.completed, code: 0 };
  } catch (error) {
    const { response } = error;
    return { messageError: response.data.error, status: response.status, code: -1 };
  }
};

export const uploadLogo = async (id, body) => {
  try {
    const formData = new FormData();
    formData.append('logotipo', body);
    const response = await instanceWithRocket.post(
      `/projects/${id}/jupiter/personalidad-marca`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Content-Length': body.size.toString(),
        },
      }
    );
    const { data } = response.data;
    return { data: data, completed: data.completed, code: 0 };
  } catch (error) {
    const { response } = error;
    return { messageError: response.data.error, status: response.status, code: -1 };
  }
};
