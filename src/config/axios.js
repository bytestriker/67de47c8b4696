import axios from 'axios';

// Configuración para la primera URL con su token
const instanceWithConekta = axios.create({
  baseURL: process.env.REACT_APP_CONEKTA_API,
});

const instanceWithRocket = axios.create({
  baseURL: process.env.REACT_APP_DEV_API,
});

const instanceRocketWP = axios.create({
  baseURL: process.env.REACT_APP_DEV_WP,
});

// Interceptor para la instancia de Conekta
instanceWithConekta.interceptors.request.use(
  (config) => {
    config.headers.common['Authorization'] = String(
      `Bearer ${process.env.REACT_APP_CONEKTA_APIKEY_PRIVATE}`
    );

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para la instancia de Rocket
instanceWithRocket.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      const convert = JSON.parse(token);
      config.headers.common['Authorization'] = String(`Bearer ${convert}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { instanceWithConekta, instanceWithRocket, instanceRocketWP };
