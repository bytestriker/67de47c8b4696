import { create } from 'zustand';

// Helpers
import { setToStorage, getFromStorage } from '@Helpers/localStorage';
import { LocalStoragePlanets, statusPlanet } from '@Helpers/constants';

const venus = {
  planet: 'Venus',
  id: '',
  painpoints: [],
  fortalezas: [],
  oportunidades: [],
  debilidades: [],
  amenazas: [],
  foda_1: {
    fortalezas_oportunidades: [],
    conclusion: '',
  },
  foda_2: {
    // debilidades_amenazas: [],
    oportunidades_debilidades: [],
    conclusion: '',
  },
  foda_3: {
    fortalezas_amenazas: [],
    conclusion: '',
  },
  foda_4: {
    debilidades_amenazas: [],
    conclusion: '',
  },
  buyer: {
    nombre: '',
    frase: '',
    edad: '',
    ubicacion: '',
    profesion: '',
    background: '',
    goals: '',
    motivations: '',
    frustrations: '',
  },
  buyerComplete: false,
  complete: 0,
  label: statusPlanet.ACCEDER,
  lockedPlanet: false,
};

export const venusStore = create((set, get) => ({
  dataVenus: JSON.parse(getFromStorage(LocalStoragePlanets.VENUS)) || venus,

  setVenus: (newState) => {
    set({ dataVenus: newState });
    setToStorage(LocalStoragePlanets.VENUS, JSON.stringify(newState));
  },

  setBuyerComplete: (newState) => {
    set((state) => ({ dataVenus: { ...state.dataVenus, buyerComplete: newState } }));
    setToStorage(LocalStoragePlanets.VENUS, JSON.stringify(get().dataVenus));
  },
  setPainPoints: (newState) => {
    set((state) => ({ dataVenus: { ...state.dataVenus, painpoints: newState } }));
    setToStorage(LocalStoragePlanets.VENUS, JSON.stringify(get().dataVenus));
  },

  setFortaleza: (newState) => {
    set((state) => ({ dataVenus: { ...state.dataVenus, fortalezas: newState } }));
    setToStorage(LocalStoragePlanets.VENUS, JSON.stringify(get().dataVenus));
  },

  setOportunidades: (newState) => {
    set((state) => ({ dataVenus: { ...state.dataVenus, oportunidades: newState } }));
    setToStorage(LocalStoragePlanets.VENUS, JSON.stringify(get().dataVenus));
  },

  setDebilidades: (newState) => {
    set((state) => ({ dataVenus: { ...state.dataVenus, debilidades: newState } }));
    setToStorage(LocalStoragePlanets.VENUS, JSON.stringify(get().dataVenus));
  },

  setAmenazas: (newState) => {
    set((state) => ({ dataVenus: { ...state.dataVenus, amenazas: newState } }));
    setToStorage(LocalStoragePlanets.VENUS, JSON.stringify(get().dataVenus));
  },

  setStateFoda: async (newState) => {
    set((state) => ({ dataVenus: { ...state.dataVenus, foda_1: newState } }));
    setToStorage(LocalStoragePlanets.VENUS, JSON.stringify(get().dataVenus));
  },

  setStateFoda2: async (newState) => {
    set((state) => ({ dataVenus: { ...state.dataVenus, foda_2: newState } }));
    setToStorage(LocalStoragePlanets.VENUS, JSON.stringify(get().dataVenus));
  },

  setStateFoda3: async (newState) => {
    set((state) => ({ dataVenus: { ...state.dataVenus, foda_3: newState } }));
    setToStorage(LocalStoragePlanets.VENUS, JSON.stringify(get().dataVenus));
  },

  setStateFoda4: async (newState) => {
    set((state) => ({ dataVenus: { ...state.dataVenus, foda_4: newState } }));
    setToStorage(LocalStoragePlanets.VENUS, JSON.stringify(get().dataVenus));
  },

  setStateBuyer: async (newState) => {
    set((state) => ({ dataVenus: { ...state.dataVenus, buyer: newState } }));
    setToStorage(LocalStoragePlanets.VENUS, JSON.stringify(get().dataVenus));
  },

  getVenus: () => JSON.parse(getFromStorage(LocalStoragePlanets.VENUS)) || get().dataVenus,
}));
