import { instanceWithRocket } from '@Config/axios';

const headersDefault = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

export const createProjectUrano = async (body) => {
  try {
    const response = await instanceWithRocket.post(
      `/projects/${param.id}/urano`,
      body,
      headersDefault
    );
    const { URANO, Status_planeta } = response.data;
    return { data: URANO, code: 0, statusPlanet: Status_planeta };
  } catch (error) {
    const { response } = error;
    return { messageError: response.data.error, code: -1, status: response.status };
  }
};

export const getProjectUrano = async (id) => {
  try {
    const { data: response } = await instanceWithRocket.get(
      `/projects/${id}/urano`,
      headersDefault
    );
    const { original } = response.Urano;
    const { data } = original;
    return { data: data, code: 0, statusPlanet: response.Status_planeta };
  } catch (error) {
    const { response } = error;
    return { messageError: response.data.error, code: -1, status: response.status };
  }
};

export const serviceUploadDoc = async (id, body) => {
  try {
    const formData = new FormData();
    formData.append('pretotipo', body);
    const response = await instanceWithRocket.post(`/projects/${id}/urano`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Content-Length': body.size.toString(),
      },
    });
    return { data: response.data.data, code: 0 };
  } catch (error) {
    const { response } = error;
    return { messageError: response.data.error, code: -1, status: response.status };
  }
};

export const serviceUploadPl = async (id, body) => {
  try {
    const formData = new FormData();
    formData.append('pl', body);
    const response = await instanceWithRocket.post(`/projects/${id}/urano`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Content-Length': body.size.toString(),
      },
    });
    return { data: response.data.data, code: 0 };
  } catch (error) {
    const { response } = error;
    return { messageError: response.data.error, code: -1, status: response.status };
  }
};

export const servicesaveprototipo = async (id, body) => {
  try {
    const formData = new FormData();
    formData.append('prototipo', body);
    const response = await instanceWithRocket.post(`/projects/${id}/urano`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return { data: response.data.data, code: 0 };
  } catch (error) {
    const { response } = error;
    return { messageError: response.data.error, code: -1, status: response.status };
  }
};
