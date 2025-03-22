import { create } from 'zustand';

// Helpers
import { setToStorage, getFromStorage } from '@Helpers/localStorage';
import { LocalStorageCompraTanques, LocalStorageTanquesRestantes } from '@Helpers/constants';

const warning = {
  modalAlert: false,
  message: '',
  galaxia: true,
};

export const globalStore = create((set) => ({
  warningData: warning,
  setAlert: (newState) =>
    set((state) => ({ warningData: { ...state.warningData, modalAlert: newState } })),
  setMessage: (newState) =>
    set((state) => ({ warningData: { ...state.warningData, message: newState } })),
  setGalaxia: (newState) =>
    set((state) => ({ warningData: { ...state.warningData, galaxia: newState } })),
}));

const popups = {
  modalP: false,

};

export const Popup = create((set) => ({
  popupstate: popups,
  setPopup: (newState) =>
    set((state) => ({ popupstate: { ...state.popupstate, modalP: newState } })),
 
}));

/* STORE COMPRA DE TANQUE */
const tanques = {
  packageType: '', // tipo de paquete
  price: '', // precio
  amount: '', // cantidad de paquetes
  pack_id: '', // id del tanque
  name: '', // nombre del paquete
  priceDefault: '', // precio default
  code: '', // cupon de descuento
  ammountPack: 1, // numero de paquetes
};

export const storeBuyTank = create((set, get) => ({
  tanquesData: JSON.parse(getFromStorage(LocalStorageCompraTanques.TANKS)) || tanques,
  getTanques: () =>
    JSON.parse(getFromStorage(LocalStorageCompraTanques.TANKS)) || get().tanquesData,

  setTanques: (state) => {
    set({ tanquesData: state });
    setToStorage(LocalStorageCompraTanques.TANKS, JSON.stringify(state));
  },
  setCode: (newState) =>
    set((state) => ({ tanquesData: { ...state.tanquesData, code: newState } })),
}));

/* STORE TANQUES RESTANTES */
const remainingTank = {
  remainingTanks: '0', // paquetes restantes
};

export const storeRemainingTank = create((set, get) => ({
  remainingTankData:
    JSON.parse(getFromStorage(LocalStorageTanquesRestantes.REMAINING_TANKS)) || remainingTank,
  setTanquesRestante: (state) => {
    set({ remainingTankData: state });
    setToStorage(LocalStorageTanquesRestantes.REMAINING_TANKS, JSON.stringify(state));
  },
  getTanquesRestante: () =>
    JSON.parse(getFromStorage(LocalStorageTanquesRestantes.REMAINING_TANKS)) ||
    get().remainingTankData,
}));

const ModalTanquesInfo = {
  modalTank: false,
  title: '',
  message: '',
  rute: '/',
  tanques: 0,
  exchange: false,
  planet: '',
};

export const storeModalTank = create((set, get) => ({
  storeTankModal: ModalTanquesInfo,
  setModalInfo: (state) => {
    set({ storeTankModal: state });
  },
  getModalInfo: () => get().storeTankModal,

  setModal: (newState) =>
    set((state) => ({ storeTankModal: { ...state.storeTankModal, modalTank: newState } })),
}));
