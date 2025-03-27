import { instanceWithRocket } from '@Config/axios';

// Contants
import { LocalStoragePlanets } from '@Helpers/constants';

const headersUrlencoded = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

const headersJson = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const login = async (data) => {
  try {
    const body = new URLSearchParams();
    body.append('email', data.email);
    body.append('password', data.password);

    const response = await instanceWithRocket.post(`/auth/login`, body, headersUrlencoded);

    return response;
  } catch (error) {
    return error;
  }
};

export const singUpUser = async (params) => {
  try {
    const body = new URLSearchParams();
    body.append('nombre', params.nombre);
    body.append('email', params.email);
    body.append('password', params.password);
    const response = await instanceWithRocket.post(`/users`, body, headersUrlencoded);

    return { data: response.data.data, code: 0 };
  } catch (error) {
    const { response } = error;
    return { messageError: response.data.message[0], code: -1, status: response.status };
  }
};

export const getUser = async () => {
  try {
    const response = await instanceWithRocket.get(`/user`, headersUrlencoded);
    return response;
  } catch (error) {
    console.log('Exception Error: ', error);
    return error;
  }
};

export const getProjects = async () => {
  try {
    const response = await instanceWithRocket.get(`/projects`, headersUrlencoded);
    return response;
  } catch (error) {
    console.log('Exception Error: ', error);
    return error;
  }
};

export const getProjectById = async (id) => {
  try {
    const response = await instanceWithRocket.get(`/projects/${id}`, headersUrlencoded);
    return response;
  } catch (error) {
    console.log('Exception Error: ', error);
    return error;
  }
};

export const createProject = async (data) => {
  try {
    const response = await instanceWithRocket.post(`/projects`, data, headersJson);
    return { data: response.data.data, code: 0 };
  } catch (error) {
    const { response } = error;
    return { messageError: response.data.error, code: -1, status: response.status };
  }
};

export const updateProject = async (data) => {
  try {
    const param = JSON.parse(localStorage.getItem(LocalStoragePlanets.LUNA));
    const body = new URLSearchParams();
    if (data.nombre) {
      body.append('nombre', data.nombre);
    }
    if (data.que) {
      body.append('que', data.que);
    }
    if (data.porque) {
      body.append('porque', data.porque);
    }
    if (data.como1) {
      body.append('como1', data.como1);
    }
    if (data.como2) {
      body.append('como2', data.como2);
    }
    if (data.como3) {
      body.append('como3', data.como3);
    }
    const response = await instanceWithRocket.put(`/projects/${param.id}`, body, headersUrlencoded);
    return response;
  } catch (error) {
    console.log('Exception Error: ', error);
    return error;
  }
};

export const serviceUploadImage = async (body) => {
  try {
    const formData = new FormData();
    formData.append('imagen', body);
    formData.append('_method', 'put');
    const response = await instanceWithRocket.post(`/user`, formData, {
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

export const ConfirmEmail = async (email) => {
  try {
    const json = JSON.stringify({ email });
    const response = await instanceWithRocket.post(`/password/email`, json, headersJson);
    return { data: response.data, code: 0 };
  } catch (error) {
    const { response } = error;
    return { messageError: response.data.error, code: -1, status: response.status };
  }
};

export const restartPasword = async (body) => {
  try {
    const response = await instanceWithRocket.post(`/password/reset`, body, headersJson);
    return { data: response.data, code: 0 };
  } catch (error) {
    const { response } = error;
    return { messageError: response.data.error, code: -1, status: response.status };
  }
};
