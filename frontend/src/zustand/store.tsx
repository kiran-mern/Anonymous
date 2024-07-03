import {create} from 'zustand';

type ModalState ={
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  // feeling: string;
  // setFeeling: (feeling: string)=>void;
}

export const useModalStore = create<ModalState>((set) => ({
  showModal: false,
  setShowModal: (show: boolean) => set({ showModal: show }),
  // feeling: '',
  // setFeeling: (feeling: string) => set({ feeling }),

}));
