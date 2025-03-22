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

/**
 * @method GET
 */
export const getProjectVenus = async (id) => {
  try {
    const response = await instanceWithRocket.get(`/projects/${id}/venus`, headersDefault);
    const { Status_planeta, Venus } = response.data;
    const { original } = Venus;
    return { data: original.data, Status_planeta: Status_planeta, code: 0 };
  } catch (error) {
    const { response } = error;
    return { messageError: response.data.error, status: response.status, code: -1 };
  }
};

/**
 * @method GET
 */
export const getConclusionFO = async (id) => {
  try {
    const response = await instanceWithRocket.get(
      `/projects/${id}/venus/conclusionFO`,
      headersDefault
    );
    const { data } = response.data;
    return { data: data, completed: data.completed, code: 0 };
  } catch (error) {
    const { response } = error;
    return { messageError: response.data.error, status: response.status, code: -1 };
  }
};

/**
 * @method GET
 */
export const getConclusionDA = async (id) => {
  try {
    const response = await instanceWithRocket.get(
      `/projects/${id}/venus/conclusionOD`,
      headersDefault
    );
    const { data } = response.data;
    return { data: data, completed: data.completed, code: 0 };
  } catch (error) {
    const { response } = error;
    return { messageError: response.data.error, status: response.status, code: -1 };
  }
};

/**
 * @method GET
 */
export const getConclusionFA = async (id) => {
  try {
    const response = await instanceWithRocket.get(
      `/projects/${id}/venus/conclusionFA`,
      headersDefault
    );
    const { data } = response.data;
    return { data: data, completed: data.completed, code: 0 };
  } catch (error) {
    const { response } = error;
    console.log(`Error GET: ` + error);
    return { messageError: response.data.error, status: response.status, code: -1 };
  }
};

/**
 * @method GET
 */
export const getConclusionDEAM = async (id) => {
  try {
    const response = await instanceWithRocket.get(
      `/projects/${id}/venus/conclusionDEAM`,
      headersDefault
    );
    const { data } = response.data;
    return { data: data, completed: data.completed, code: 0 };
  } catch (error) {
    const { response } = error;
    console.log(`Error GET: ` + error);
    return { messageError: response.data.error, status: response.status, code: -1 };
  }
};

/**
 * @method GET
 */
export const getBuyerPersona = async (id) => {
  try {
    const response = await instanceWithRocket.get(
      `/projects/${id}/venus/buyer-persona`,
      headersDefault
    );
    const { data } = response.data;
    return { data: data, completed: data[0].completed, code: 0 };
  } catch (error) {
    const { response } = error;
    return { messageError: response.data.error, status: response.status, code: -1 };
  }
};

/**
 * @method POST
 */
export const createProyectVenus = async (data, id) => {
  try {
    const response = await instanceWithRocket.post(`/projects/${id}/venus`, data, headersJson);
    const { VENUS, Status_planeta } = response.data;
    return { data: VENUS, code: 0, statusPlanet: Status_planeta };
  } catch (error) {
    const { response } = error;
    return { messageError: response.data.error, code: -1, status: response.status };
  }
};

/**
 * @method POST
 */
export const createConclusionFO = async (id, params) => {
  try {
    const response = await instanceWithRocket.post(
      `/projects/${id}/venus/conclusionFO`,
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

/**
 * @method POST
 */
export const createConclusionOD = async (id, params) => {
  try {
    const response = await instanceWithRocket.post(
      `/projects/${id}/venus/conclusionOD`,
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

/**
 * @method POST
 */
export const createConclusionFA = async (id, params) => {
  try {
    const response = await instanceWithRocket.post(
      `/projects/${id}/venus/conclusionFA`,
      params,
      headersJson
    );
    const { data } = response.data;
    return { data: data, completed: data.completed, code: 0 };
  } catch (error) {
    const { response } = error;
    console.log(`Error POST: ` + error);
    
    return { messageError: response.data.error, status: response.status, code: -1 };
  }
};

/**
 * @method POST
 */
export const createConclusionDEAM = async (id, params) => {
  try {
    const response = await instanceWithRocket.post(
      `/projects/${id}/venus/conclusionDEAM`,
      params,
      headersJson
    );
    const { data } = response.data;
    return { data: data, completed: data.completed, code: 0 };
  } catch (error) {
    const { response } = error;
    console.log(`Error POST: ` + error);
    
    return { messageError: response.data.error, status: response.status, code: -1 };
  }
};

/**
 * @method POST
 */
export const createBuyerPersona = async (id, params) => {
  try {
    const response = await instanceWithRocket.post(
      `/projects/${id}/venus/buyer-persona`,
      params,
      headersJson
    );
    const { data } = response.data;
    return { data: data, completed: data[0].completed, code: 0 };
  } catch (error) {
    const { response } = error;
    return { messageError: response.data.error, status: response.status, code: -1 };
  }
};
