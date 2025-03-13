import { useContext } from "react";
import { ScheduleContext } from "../context/ScheduleContext";

export const useScheduleContext = () => {
    const context = useContext(ScheduleContext)

    if(!context) {
        throw Error('useScheduleContext must be used inside an ScheduleContextProvider')
    }

    return context
}