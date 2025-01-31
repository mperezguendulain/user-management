import { create } from "zustand";

import type { User } from "@/types/users.type";

type AuthState = {
  loggedUser?: User;
  setLoggedUser: (user: User) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  loggedUser: undefined,
  setLoggedUser: (newLoggedUser: User) => set({ loggedUser: newLoggedUser })
}));
