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

export const getProjectSaturno = async (id) => {
  try {
    const response = await instanceWithRocket.get(`/projects/${id}/saturno`, headersDefault);
    const { Status_planeta, Saturno } = response.data;
    const { data } = Saturno.original;
    return { data: data, Status_planeta: Status_planeta, code: 0 };
  } catch (error) {
    const { response } = error;
    return { messageError: response.data.error, status: response.status, code: -1 };
  }
};

export const createProyectSaturno = async (id, params) => {
  try {
    const response = await instanceWithRocket.post(`/projects/${id}/saturno`, params, headersJson);
    const { Status_planeta, SATURNO } = response.data;
    return { data: SATURNO, code: 0, Status_planeta: Status_planeta };
  } catch (error) {
    const { response } = error;
    return { messageError: response.data.error, code: -1, status: response.status };
  }
};
