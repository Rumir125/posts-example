import { ReactNode, createContext } from "react";

import { UserData } from "./type";

type AppProviderType = {
  users: UserData[];
};

export const AppContext = createContext<AppProviderType>({
  users: [],
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AppContext.Provider value={{ users: [] }}>{children}</AppContext.Provider>
  );
};

// export const useAppContext = () => useContext(AppContext);
