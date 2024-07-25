import {create} from 'zustand';

type ModalState ={
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  // feeling: string;
  // setFeeling: (feeling: string)=>void;
};

type DeactivateModal = {
  isOpen: boolean;
  setIsOpen: (show: boolean)=> void;
  onClose: () => void;
  onConfirm: () => void;
};

type Message={
  id:number,
  profileName:string,
  userId:number,
  receiverId:number,
  lastMessage:string
};

type ChatMessage={
  id:number;
  sender: string;
  isSent: boolean;
  content: string;
  timeStamp:string
};

type ChatState={
  connected:Message[];
  setConnected:(messages:Message[])=>void;
  requested:Message[];
  setRequested:(messages:Message[])=>void;
  chatMessages:ChatMessage[];
  setChatMessages:(message:ChatMessage[])=>void;
  addChatMessage:(message:ChatMessage)=>void;
  selectedUser:Message | null;
  setSelectedUser: (user:Message | null)=>void;


};

type StoreState= ModalState & DeactivateModal & ChatState ;

export const useModalStore = create<StoreState>((set) => ({
  // ModalState of creating the Post
  showModal: false,
  setShowModal: (show: boolean) => set({ showModal: show }),

  // feeling: '',
  // setFeeling: (feeling: string) => set({ feeling }),

  // DeactivateModal
  isOpen: false,
  setIsOpen: (show: boolean) => set({ isOpen: show }),
  onClose: () => set({ isOpen: false }),
  onConfirm: () => {
    set({ isOpen: false });
  },

  // ChatState
  connected: [],
  requested: [],
  chatMessages: [],
  selectedUser: null,
  setConnected: (messages: Message[]) => set({ connected: messages }),
  setRequested: (messages: Message[]) => set({ requested: messages }),
  setChatMessages: (messages: ChatMessage[]) => set({ chatMessages: messages }),
  addChatMessage: (message: ChatMessage) => set((state) => ({ chatMessages: [...state.chatMessages, message] })),
  setSelectedUser: (user: Message | null) => set({ selectedUser: user }),
}));
