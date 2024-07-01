import {create} from 'zustand';

type ModalState ={
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  showModal: false,
  setShowModal: (show: boolean) => set({ showModal: show }),
}));
