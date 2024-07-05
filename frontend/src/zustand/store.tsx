import {create} from 'zustand';

type ModalState ={
  showModal: boolean;
  setShowModal: (show: boolean) => void;


  // feeling: string;
  // setFeeling: (feeling: string)=>void;


}
type DeactivateModal = {
  isOpen: boolean;
  setIsOpen: (show: boolean)=> void;
  onClose: () => void;
  onConfirm: () => void;
}

type StoreState= ModalState & DeactivateModal;

export const useModalStore = create<StoreState> ((set) => ({

  //ModalState of creating the Post 

  showModal: false,
  setShowModal: (show: boolean) => set({ showModal: show }),

  
  // feeling: '',
  // setFeeling: (feeling: string) => set({ feeling }),

  //DeactivateModal

  isOpen:false,
  setIsOpen:(show:boolean)=> set({isOpen:show}),
  onClose:()=>set({isOpen:false}),
  onConfirm:()=>{
    set({isOpen:false})
  }
}));

