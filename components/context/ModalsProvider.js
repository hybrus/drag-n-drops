import { useState } from "react";
import { ModalsContext } from "./ModalsContext";

export const ModalsProvider = ({ children }) => {
    const initialState = {
        showTextBoxInput: false,
        showImageInput: false,
        showChartInput: false,
    }

    const [modals, setModals] = useState(initialState);

    return (
        <ModalsContext.Provider value={{ modals, setModals }}>
            {children}
        </ModalsContext.Provider>
    );
};