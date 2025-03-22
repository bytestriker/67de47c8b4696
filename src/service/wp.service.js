import { instanceRocketWP } from '@Config/axios';

const headersDefault = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

export const getServiceHome = async () => {
  try {
    const response = await instanceRocketWP.get(`/home`, headersDefault);
    return response;
  } catch (error) {
    return error;
  }
};

export const getServiceLegales = async () => {
  try {
    const response = await instanceRocketWP.get(`/pages?post=35`, headersDefault);
    return response;
  } catch (error) {
    return error;
  }
};

export const getServiceLunaTxt = async () => {
  try {
    const response = await instanceRocketWP.get(`/luna/49`, headersDefault);
    return response;
  } catch (error) {
    return error;
  }
};

export const getServiceLunaQuestions = async () => {
  try {
    const response = await instanceRocketWP.get(`/luna/312`, headersDefault);
    return response;
  } catch (error) {
    return error;
  }
};

export const getServiceMercurioInfo = async () => {
  try {
    const response = await instanceRocketWP.get(`/mercurio/50`, headersDefault);
    return response;
  } catch (error) {
    return error;
  }
};

export const getServiceMercurioQuestions = async () => {
  try {
    const response = await instanceRocketWP.get(`/mercurio/78`, headersDefault);
    return response;
  } catch (error) {
    return error;
  }
};

export const getServiceVenusInfo = async () => {
  try {
    const response = await instanceRocketWP.get(`/venus/51`, headersDefault);
    return response;
  } catch (error) {
    return error;
  }
};

export const getServiceVenusQuestions = async () => {
  try {
    const response = await instanceRocketWP.get(`/venus/221`, headersDefault);
    return response;
  } catch (error) {
    return error;
  }
};

export const getServiceMarteInfo = async () => {
  try {
    const response = await instanceRocketWP.get(`/marte/53`, headersDefault);
    return response;
  } catch (error) {
    return error;
  }
};

export const getServiceMarteQuestions = async () => {
  try {
    const response = await instanceRocketWP.get(`/marte/80`, headersDefault);
    return response;
  } catch (error) {
    return error;
  }
};

export const getServiceJupiterInfo = async () => {
  try {
    const response = await instanceRocketWP.get(`/jupiter/54`, headersDefault);
    return response;
  } catch (error) {
    return error;
  }
};

export const getServiceJupiterQuestions = async () => {
  try {
    const response = await instanceRocketWP.get(`/jupiter/223`, headersDefault);
    return response;
  } catch (error) {
    return error;
  }
};

export const getServiceSaturnoInfo = async () => {
  try {
    const response = await instanceRocketWP.get(`/saturno/55`, headersDefault);
    return response;
  } catch (error) {
    return error;
  }
};

export const getServiceSaturnoQuestions = async () => {
  try {
    const response = await instanceRocketWP.get(`/saturno/265`, headersDefault);
    return response;
  } catch (error) {
    return error;
  }
};

export const getServiceUranoInfo = async () => {
  try {
    const response = await instanceRocketWP.get(`/urano/56`, headersDefault);
    return response;
  } catch (error) {
    return error;
  }
};

export const getServiceTierraQuestions = async () => {
  try {
    const response = await instanceRocketWP.get(`/tierra/222`, headersDefault);
    return response;
  } catch (error) {
    return error;
  }
};
export const getServiceTierraInfo = async () => {
  try {
    const response = await instanceRocketWP.get(`/tierra/52`, headersDefault);
    return response;
  } catch (error) {
    return error;
  }
};

export const getServiceUranoQuestions = async () => {
  try {
    const response = await instanceRocketWP.get(`/urano/297`, headersDefault);
    return response;
  } catch (error) {
    return error;
  }
};

export const getServiceNeptunoInfo = async () => {
  try {
    const response = await instanceRocketWP.get(`/neptuno/57`, headersDefault);
    return response;
  } catch (error) {
    return error;
  }
};
