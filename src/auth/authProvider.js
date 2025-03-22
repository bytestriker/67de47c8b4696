// Almacenara contexto del usuario.
import { useState, useEffect } from 'react';
import AppContext from '@Auth/appContext';

import { getFromStorage } from '@Helpers/localStorage';
import { LocalStorageKeys } from '@Helpers/constants';

// Exportar authprovider y ponerlo en un punto alto de la app.
const ProviderComponent = ({ children }) => {
  const [getPageLuna, setPageLuna] = useState(1);
  const [getLoading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [advisory, setAdvisory] = useState(false);
  const [reloadPacks, setReloadPacks] = useState('');
  const [token, setToken] = useState(JSON.parse(getFromStorage(LocalStorageKeys.JWT)) || null);

  // Carga el token de session
  useEffect(() => {
    try {
      if (token) {
        localStorage.setItem('token', JSON.stringify(token));
      }
    } catch (error) {
      localStorage.removeItem('token');
      throw error;
    }
  }, [token]);

  // Manejo de sesión
  const contextValue = {
    token,
    login(data) {
      setToken(data);
    },

    logout() {
      setToken(null);
      localStorage.clear();
    },

    isLogged() {
      return !!token;
    },
  };

  return (
    <AppContext.Provider
      value={{
        contextValue,
        setLoading,
        getLoading,
        modal,
        setModal,
        advisory,
        setAdvisory,
        reloadPacks,
        setReloadPacks,
        getPageLuna,
        setPageLuna,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Exportar poder consumir en los componentes que necesitemos acceder a dicho contexto
export default ProviderComponent;
