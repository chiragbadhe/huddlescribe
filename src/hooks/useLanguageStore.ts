import {create} from 'zustand';

interface LanguageState {
  value: string;
  label: string;
  setValue: (value: string, label: string) => void;
}

const useLanguageStore = create<LanguageState>((set) => ({
  value: "en-IN",
  label: "English",
  setValue: (value: string, label: string) => set({ value, label }),
}));

export default useLanguageStore;