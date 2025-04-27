import { User } from "@/api/user";
import { create } from "zustand";

type Props = {
  user: User | null;
};

type Methods = {
  setter: (user: User | null) => void;
};

export const useUserStore = create<Props & Methods>()((set) => ({
  user: null,
  setter: (user) => set({ user }),
}));
