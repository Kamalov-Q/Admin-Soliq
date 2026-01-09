import { create } from "zustand";

interface Store {
  currentLang: "uz" | "ru" | "en";
  setCurrentLang: (lang: "uz" | "ru" | "en") => void;
}

export const useStore = create<Store>((set) => ({
  currentLang: "en",
  setCurrentLang: (lang: "uz" | "ru" | "en") => set({ currentLang: lang }),
}));
