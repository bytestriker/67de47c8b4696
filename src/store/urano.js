import { create } from 'zustand';

// Helpers
import { setToStorage, getFromStorage } from '@Helpers/localStorage';
import { LocalStoragePlanets, statusPlanet } from '@Helpers/constants';

const urano = {
  planet: 'Urano',
  id: '',
  prototipo: '',
  pretotipo: '',
  pl: '',
  proveedores:[],
  complete: 0,
  label: statusPlanet.ACCEDER,
  lockedPlanet: false,
};

export const uranoStore = create((set, get) => ({
  dataUrano: JSON.parse(getFromStorage(LocalStoragePlanets.URANO)) || urano,

  setUrano: (newState) => {
    set({ dataUrano: newState });
    setToStorage(LocalStoragePlanets.URANO, JSON.stringify(newState));
  },
  setUnblock: (newState) =>
    set((state) => ({ dataUrano: { ...state.dataUrano, lockedPlanet: newState } })),

  geUrano: () => JSON.parse(getFromStorage(LocalStoragePlanets.URANO)) || get().dataUrano,
}));
