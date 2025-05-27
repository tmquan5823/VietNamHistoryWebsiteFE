import { removeAccessToken, setAccessToken } from "../utils/storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { User } from "@/dataHelper/auth.dataHelper";
interface UserStore {
  isAuthenticated: boolean;
  user: User | undefined;
  refreshToken: string | undefined;
  login: (token: string, user: User, refreshToken: string) => void;
  logout: () => void;
}

export const useUserStore = create<
  UserStore,
  [["zustand/persist", unknown]]
>(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: undefined,
      refreshToken: undefined,
      login(token: string, user: User, refreshToken: string) {
        setAccessToken(token);
        set(() => ({
          isAuthenticated: true,
          user,
          refreshToken,
        }));
      },
      logout() {
        removeAccessToken();
        set(() => ({
          isAuthenticated: false,
          user: undefined,
          refreshToken: undefined,
        }));
      },
    }),
    { name: "user", storage: createJSONStorage(() => localStorage) }
  )
);
