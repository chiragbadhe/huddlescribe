import {create} from 'zustand';


interface DisplayTextStoreState {
    caption: string;
    setCaption: (text: string) => void;
  }
  
  const useDisplayTextStore = create<DisplayTextStoreState>((set) => ({
    caption: '',
    setCaption: (caption) => set({ caption }),
  }));


  export default useDisplayTextStore;
