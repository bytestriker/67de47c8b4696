import { create } from 'zustand';

// Helpers
import { setToStorage, getFromStorage } from '@Helpers/localStorage';
import { LocalStoragePlanets, statusPlanet } from '@Helpers/constants';

const jupiter = {
  planet: 'Jupiter',
  id: '',
  caracteristicas: [],
  adjetivos_calificativos: [],
  objetivos: [],
  significados: [],
  ideas_nombre: [],
  opcion_1: '',
  opcion_2: '',
  opcion_3: '',
  adjetivos: [],
  descripcion_marca: '',
  marcaComplete: false,
  complete: 0,
  label: statusPlanet.ACCEDER,
  lockedPlanet: false,
};

export const jupiterStore = create((set, get) => ({
  dataJupiter: JSON.parse(getFromStorage(LocalStoragePlanets.JUPITER)) || jupiter,

  setJupiter: (newState) => {
    set({ dataJupiter: newState });
    setToStorage(LocalStoragePlanets.JUPITER, JSON.stringify(newState));
  },

  setStateCaracteristicas: async (newState) => {
    set((state) => ({ dataJupiter: { ...state.dataJupiter, caracteristicas: newState } }));
    setToStorage(LocalStoragePlanets.JUPITER, JSON.stringify(get().dataJupiter));
  },

  setStateAdjetivosCa: async (newState) => {
    set((state) => ({ dataJupiter: { ...state.dataJupiter, adjetivos_calificativos: newState } }));
    setToStorage(LocalStoragePlanets.JUPITER, JSON.stringify(get().dataJupiter));
  },

  setStateObjetivos: async (newState) => {
    set((state) => ({ dataJupiter: { ...state.dataJupiter, objetivos: newState } }));
    setToStorage(LocalStoragePlanets.JUPITER, JSON.stringify(get().dataJupiter));
  },

  setStateSignificados: async (newState) => {
    set((state) => ({ dataJupiter: { ...state.dataJupiter, significados: newState } }));
    setToStorage(LocalStoragePlanets.JUPITER, JSON.stringify(get().dataJupiter));
  },

  setStateIdeasNombre: async (newState) => {
    set((state) => ({ dataJupiter: { ...state.dataJupiter, ideas_nombre: newState } }));
    setToStorage(LocalStoragePlanets.JUPITER, JSON.stringify(get().dataJupiter));
  },

  setStateOpcion1: async (newState) => {
    set((state) => ({ dataJupiter: { ...state.dataJupiter, opcion_1: newState } }));
    setToStorage(LocalStoragePlanets.JUPITER, JSON.stringify(get().dataJupiter));
  },

  setStateOpcion2: async (newState) => {
    set((state) => ({ dataJupiter: { ...state.dataJupiter, opcion_2: newState } }));
    setToStorage(LocalStoragePlanets.JUPITER, JSON.stringify(get().dataJupiter));
  },

  setStateOpcion3: async (newState) => {
    set((state) => ({ dataJupiter: { ...state.dataJupiter, opcion_3: newState } }));
    setToStorage(LocalStoragePlanets.JUPITER, JSON.stringify(get().dataJupiter));
  },

  setStateDescripcionMarca: async (newState) => {
    set((state) => ({ dataJupiter: { ...state.dataJupiter, descripcion_marca: newState } }));
    setToStorage(LocalStoragePlanets.JUPITER, JSON.stringify(get().dataJupiter));
  },

  setStateMarcaComplete: async (newState) => {
    set((state) => ({ dataJupiter: { ...state.dataJupiter, marcaComplete: newState } }));
    setToStorage(LocalStoragePlanets.JUPITER, JSON.stringify(get().dataJupiter));
  },

  getJupiter: () => JSON.parse(getFromStorage(LocalStoragePlanets.JUPITER)) || get().dataJupiter,
}));
