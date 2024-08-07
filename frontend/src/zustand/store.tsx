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
  lastMessage:string,
  groupId?:number,
  type:'user' | 'group',
};

type ChatMessage={
  id:number;
  sender: string;
  type:string,
  isSent: boolean;
  content: string;
  timeStamp:string
};

type ChatState={
  connected:Message[];
  setConnected:(messages:Message[])=>void;
  connectedGroups:Message[];
  setConnectedGroups:(messages:Message[])=>void;
  requested:Message[];
  setRequested:(messages:Message[])=>void;
  chatMessages:ChatMessage[];
  setChatMessages:(message:ChatMessage[])=>void;
  addChatMessage:(message:ChatMessage)=>void;
  selectedUser:Message | null;
  setSelectedUser: (user:Message | null)=>void;


};

type UserState={
  userId:number | null,
  setUserId:(id:number)=>void
}

type StoreState= ModalState & DeactivateModal & ChatState& UserState ;

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
  connectedGroups:[],
  chatMessages: [],
  selectedUser: null,
  setConnected: (messages: Message[]) => set({ connected: messages }),
  setConnectedGroups:(messages:Message[])=>set({connectedGroups:messages}),
  setRequested: (messages: Message[]) => set({ requested: messages }),
  setChatMessages: (messages: ChatMessage[]) => set({ chatMessages: messages }),
  addChatMessage: (message: ChatMessage) => set((state) => ({ chatMessages: [...state.chatMessages, message] })),
  setSelectedUser: (user: Message | null) => set({ selectedUser: user }),

  //UserState
  userId: null,
  setUserId: (id: number) => set({ userId:id }),
}));
