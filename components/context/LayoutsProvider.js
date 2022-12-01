import { useState } from "react";
import { LayoutsContext } from "./LayoutsContext";

export const LayoutsProvider = ({ children }) => {
    const initialLayouts = []
    const [layouts, setLayouts] = useState(initialLayouts);
    return (
        <LayoutsContext.Provider value={{ layouts, setLayouts }}>
            {children}
        </LayoutsContext.Provider>
    );
};