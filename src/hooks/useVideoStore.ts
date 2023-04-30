
import {create} from "zustand";

type State = {
  videoSrc: string | null;
  setVideoSrc: (roomId: string) => void;
};

const videoStore = create<State>((set) => ({
  videoSrc: "",
  setVideoSrc: (videoSrc) => set({ videoSrc }),
}));

export const useVideoStore = () => {
  const { videoSrc, setVideoSrc } = videoStore();
  return { videoSrc, setVideoSrc };
};