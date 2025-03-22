import { create } from 'zustand';

// Helpers
import { setToStorage, getFromStorage } from '@Helpers/localStorage';
import { LocalStoragePlanets, statusPlanet } from '@Helpers/constants';

const luna = {
  id: '',
  nombre: '',
  que: '',
  porque: '',
  como1: '',
  como2: '',
  como3: '',
  pre: '',
  complete: 0,
  label: statusPlanet.EMPIEZA,
};

export const lunaStore = create((set, get) => ({
  dataLuna: JSON.parse(getFromStorage(LocalStoragePlanets.LUNA)) || luna,
  setLuna: (state) => {
    set({ dataLuna: state });
    setToStorage(LocalStoragePlanets.LUNA, JSON.stringify(state));
  },
  setComplete: (newState) => set((state) => ({ dataLuna: { ...state.dataLuna, complete: newState } })),
  setLabelComplete: (newState) => set((state) => ({ dataLuna: { ...state.dataLuna, label: newState } })),
  getLuna: () => JSON.parse(getFromStorage(LocalStoragePlanets.LUNA)) || get().dataLuna,
}));
