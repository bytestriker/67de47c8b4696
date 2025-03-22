import { create } from 'zustand';

// Helpers
import { setToStorage, getFromStorage } from '@Helpers/localStorage';
import { LocalStoragePlanets, statusPlanet } from '@Helpers/constants';

const marte = {
  planet: 'Marte',
  id: '',
  propuesta_valor: '',
  value_proposition: [],
  key_activities: [],
  revenue_streams: [],
  customer_relationships: [],
  channels: [],
  key_partners: [],
  cost_structure: [],
  customer_segments: [],
  key_resources: [],
  modelo_negocio: {
    value_proposition: '',
    revenue_streams: '',
    modelo_negocio: '',
  },
  complete: 0,
  label: statusPlanet.ACCEDER,
  lockedPlanet: false,
};

export const marteStore = create((set, get) => ({
  dataMarte: JSON.parse(getFromStorage(LocalStoragePlanets.MARTE)) || marte,

  setMarte: (newState) => {
    set({ dataMarte: newState });
    setToStorage(LocalStoragePlanets.MARTE, JSON.stringify(newState));
  },

  setStateValueProposition: async (newState) => {
    set((state) => ({ dataMarte: { ...state.dataMarte, value_proposition: newState } }));
    setToStorage(LocalStoragePlanets.MARTE, JSON.stringify(get().dataMarte));
    return { message: 'OK', type: 'ValueProposition' };
  },

  setStateKeyActivities: async (newState) => {
    set((state) => ({ dataMarte: { ...state.dataMarte, key_activities: newState } }));
    setToStorage(LocalStoragePlanets.MARTE, JSON.stringify(get().dataMarte));
    return { message: 'OK', type: 'KeyActivities:' };
  },

  setStateRevenueStreams: async (newState) => {
    set((state) => ({ dataMarte: { ...state.dataMarte, revenue_streams: newState } }));
    setToStorage(LocalStoragePlanets.MARTE, JSON.stringify(get().dataMarte));
    return { message: 'OK', type: 'RevenueStreams' };
  },

  setStateCustomerRelationships: async (newState) => {
    set((state) => ({ dataMarte: { ...state.dataMarte, customer_relationships: newState } }));
    setToStorage(LocalStoragePlanets.MARTE, JSON.stringify(get().dataMarte));
    return { message: 'OK', type: 'CustomerRelationships' };
  },

  setStateChannels: async (newState) => {
    set((state) => ({ dataMarte: { ...state.dataMarte, channels: newState } }));
    setToStorage(LocalStoragePlanets.MARTE, JSON.stringify(get().dataMarte));
    return { message: 'OK', type: 'Channels' };
  },

  setStateKeyPartners: async (newState) => {
    set((state) => ({ dataMarte: { ...state.dataMarte, key_partners: newState } }));
    setToStorage(LocalStoragePlanets.MARTE, JSON.stringify(get().dataMarte));
    return { message: 'OK', type: 'KeyPartners' };
  },

  setStateCostStructure: async (newState) => {
    set((state) => ({ dataMarte: { ...state.dataMarte, cost_structure: newState } }));
    setToStorage(LocalStoragePlanets.MARTE, JSON.stringify(get().dataMarte));
    return { message: 'OK', type: 'CostStructure' };
  },

  setStateCustomerSegments: async (newState) => {
    set((state) => ({ dataMarte: { ...state.dataMarte, customer_segments: newState } }));
    setToStorage(LocalStoragePlanets.MARTE, JSON.stringify(get().dataMarte));
    return { message: 'OK', type: 'CustomerSegments' };
  },

  setStateKeyResources: async (newState) => {
    set((state) => ({ dataMarte: { ...state.dataMarte, key_resources: newState } }));
    setToStorage(LocalStoragePlanets.MARTE, JSON.stringify(get().dataMarte));
    return { message: 'OK', type: 'KeyResources' };
  },

  setStateBussines: async (newState) => {
    set((state) => ({ dataMarte: { ...state.dataMarte, modelo_negocio: newState } }));
    setToStorage(LocalStoragePlanets.MARTE, JSON.stringify(get().dataMarte));
    return { message: 'OK', type: 'modelo_negocio' };
  },

  getMarte: () => JSON.parse(getFromStorage(LocalStoragePlanets.MARTE)) || get().dataMarte,
}));
