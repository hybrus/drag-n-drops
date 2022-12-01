import { createContext, useContext } from "react";
export const ModalsContext = createContext()


export const useModalsContext = () => {
    return useContext(ModalsContext);
}