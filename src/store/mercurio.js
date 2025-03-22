import { create } from 'zustand';

// Helpers
import { setToStorage, getFromStorage } from '@Helpers/localStorage';
import { LocalStoragePlanets, statusPlanet } from '@Helpers/constants';

const mercurio = {
  planet: 'Mercurio',
  id: '',
  que_resuelve: '',
  a_quien_resuelve: '',
  a_quien_resuelve_new: '',
  complete: 0,
  label: statusPlanet.ACCEDER,
  lockedPlanet: false,
};

export const mercurioStore = create((set, get) => ({
  dataMercurio: JSON.parse(getFromStorage(LocalStoragePlanets.MERCURIO)) || mercurio,

  setMercurio: (newState) => {
    set({ dataMercurio: newState });
    setToStorage(LocalStoragePlanets.MERCURIO, JSON.stringify(newState));
  },
  setUnblock: (newState) =>
    set((state) => ({ dataMercurio: { ...state.dataMercurio, lockedPlanet: newState } })),

  getMercurio: () => JSON.parse(getFromStorage(LocalStoragePlanets.MERCURIO)) || get().dataMercurio,
}));
