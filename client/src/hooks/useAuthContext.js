import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw Error("useAuthContext must be used inside an AuthContextProvider");
    }

    const { user } = context;
    const role = user?.role || null; // Extract user role safely

    return { ...context, role };
};
