import { useContext } from "react";
import { GuestContext } from "../context/GuestContext";


export const useGuestContext = () => {
    const context = useContext(GuestContext)

    if(!context) {
        throw Error('useGuestContext must be used inside an GuestContextProvider')
    }

    return context
}