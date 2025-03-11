import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw Error("useAuthContext must be used inside an AuthContextProvider");
    }

    const { user } = context;
    const role = user?.role || null; // Extract user role safely
    const id = user?.id || null; // Extract user id safely
    const email = user?.email || null; // Extract user id safely

    return { ...context, role, id };
};
