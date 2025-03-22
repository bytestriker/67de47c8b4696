import { create } from 'zustand';

// Helpers
import { setToStorage, getFromStorage } from '@Helpers/localStorage';
import { LocalStoragePlanets, statusPlanet } from '@Helpers/constants';

const saturno = {
  planet: 'Saturno',
  id: '',
  awarenesses: [],
  considerations: [],
  purchases: [],
  retentions: [],
  complete: 0,
  label: statusPlanet.ACCEDER,
  lockedPlanet: false,
};

export const saturnoStore = create((set, get) => ({
  dataSaturno: JSON.parse(getFromStorage(LocalStoragePlanets.SATURNO)) || saturno,

  setSaturno: (newState) => {
    set({ dataSaturno: newState });
    setToStorage(LocalStoragePlanets.SATURNO, JSON.stringify(newState));
  },

  setStateAwarenesses: async (newState) => {
    set((state) => ({ dataSaturno: { ...state.dataSaturno, awarenesses: newState } }));
    setToStorage(LocalStoragePlanets.SATURNO, JSON.stringify(get().dataSaturno));
  },

  setStateConsiderations: async (newState) => {
    set((state) => ({ dataSaturno: { ...state.dataSaturno, considerations: newState } }));
    setToStorage(LocalStoragePlanets.SATURNO, JSON.stringify(get().dataSaturno));
  },

  setStatePurchasess: async (newState) => {
    set((state) => ({ dataSaturno: { ...state.dataSaturno, purchases: newState } }));
    setToStorage(LocalStoragePlanets.SATURNO, JSON.stringify(get().dataSaturno));
  },

  setStateRetentions: async (newState) => {
    set((state) => ({ dataSaturno: { ...state.dataSaturno, retentions: newState } }));
    setToStorage(LocalStoragePlanets.SATURNO, JSON.stringify(get().dataSaturno));
  },

  getSaturno: () => JSON.parse(getFromStorage(LocalStoragePlanets.SATURNO)) || get().dataSaturno,
}));
