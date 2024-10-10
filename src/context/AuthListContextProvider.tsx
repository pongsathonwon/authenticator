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
    code: "a",
    digit: ["000", "000"],
    time: 10000,
  },
];

const AuthListContext = createContext<{
  list: AuthList[];
  setList: Dispatch<SetStateAction<AuthList[]>>;
  listKey: string[];
} | null>(null);

export const AuthListContextProvider = ({ children }: PropsWithChildren) => {
  const [list, setList] = useState<AuthList[]>(mock);
  const listKey = list.map(({ name }) => name);
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
