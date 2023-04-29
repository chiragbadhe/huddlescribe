
import {create} from "zustand";

type State = {
  roomId: string | null;
  setRoomId: (roomId: string) => void;
};

const useRoomIdStore = create<State>((set) => ({
  roomId: null,
  setRoomId: (roomId) => set({ roomId }),
}));

export const useRoomId = () => {
  const { roomId, setRoomId } = useRoomIdStore();
  return { roomId, setRoomId };
};