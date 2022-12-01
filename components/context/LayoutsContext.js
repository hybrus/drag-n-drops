import { createContext, useContext } from "react";
export const LayoutsContext = createContext()


export const useLayoutContext = () => {
    return useContext(LayoutsContext);
}