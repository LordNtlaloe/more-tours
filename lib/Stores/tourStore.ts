import { create } from "zustand";

interface tourState {
    showTourChangeStatusModal: boolean;
    showTourUpdateModal: boolean
    showTourBookingModal: boolean

    setShowChangeTourStatusModal: (newStatus: boolean) => void;
    setShowTourUpdateModal: (newState: boolean) => void;
    setShowTourBookingModal: (newState: boolean) => void;


}

export const useTourStore = create<tourState>()((set) => ({
    showTourChangeStatusModal: false,
    showTourUpdateModal: false,
    showTourBookingModal: false,

    setShowChangeTourStatusModal: (newStatus: boolean) => set({ showTourChangeStatusModal: newStatus }),
    setShowTourUpdateModal: (newState: boolean) => set({ showTourUpdateModal: newState }),
    setShowTourBookingModal: (newState: boolean) => set({ showTourBookingModal: newState })

}));