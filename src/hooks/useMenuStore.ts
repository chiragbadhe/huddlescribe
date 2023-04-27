import { create } from "zustand";

type MenuState = {
  isMicOn: boolean;
  setIsMicOn: (isMicOn: boolean) => void;
  isCamOn: boolean;
  setIsCamOn: (isCamOn: boolean) => void;
  isRecOn: boolean;
  setIsRecOn: (isRecOn: boolean) => void;
};

export const useMenuStore = create<MenuState>((set) => ({
  isMicOn: false,
  setIsMicOn: (isMicOn: boolean) => set({ isMicOn }),
  isCamOn: false,
  setIsCamOn: (isCamOn: boolean) => set({ isCamOn }),
  isRecOn: false,
  setIsRecOn: (isRecOn: boolean) => set({ isRecOn }),
}));
