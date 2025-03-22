// import axios from "axios";
import https from '@Config/axiosConekta';
import * as api from '@Service/urls/conekta.urls';

const headersJson = {
  headers: {
    'Accept-Language': 'es',
    Accept: 'application/vnd.conekta-v2.1.0+json',
  },
};

const headersJsonPost = {
  headers: {
    'Accept-Language': 'es',
    Accept: 'application/vnd.conekta-v2.1.0+json',
    'Content-Type': 'application/json',
  },
};

export const GetListOrders = async () => {
  try {
    const response = await https.get(api.conekta`/orders?limit=20`, headersJson);
    return response;
  } catch (error) {
    return error;
  }
};

export const CreateOrder = async (data) => {
  try {
    const response = await https.get(api.conekta, data, headersJsonPost);
    return response;
  } catch (error) {
    return error;
  }
};
