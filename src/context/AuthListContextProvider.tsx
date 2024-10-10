import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { AuthList } from "../lib/types";

const mock: AuthList[] = [
  {
    name: "a",
    value: ["000", "000"],
    timeout: 10000,
  },
  {
    name: "b",
    value: ["000", "000"],
    timeout: 10000,
  },
];

const AuthListContext = createContext<{
  list: AuthList[];
  setList: Dispatch<SetStateAction<AuthList[]>>;
  listKey: string[];
} | null>(null);

export const AuthListContextProvider = ({ children }: PropsWithChildren) => {
  const [list, setList] = useState<AuthList[]>(mock);
  const listKey = Object.keys(list);
  return (
    <AuthListContext.Provider value={{ list, setList, listKey }}>
      {children}
    </AuthListContext.Provider>
  );
};

export const useAuthListContext = () => {
  const authCtx = useContext(AuthListContext);
  if (!authCtx)
    throw new Error(
      "useAuthListContext must be used in AuthListContextProvider"
    );
  return authCtx;
};
