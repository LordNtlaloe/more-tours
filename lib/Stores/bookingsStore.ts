import { create } from "zustand";

interface bookingsState {
    showAddNewBookingsModal: boolean;
    showUpdateBookingsModal: boolean;
    showBookingsDeleteModal: boolean;
    bookingsId: string;
    bookingsDate: Date | null;

    setShowNewBookingsModal: (newStatus: boolean) => void;
    setShowUpdateBookingsModal: (newStatus: boolean) => void;
    setShowBookingsDeleteModal: (newStatus: boolean) => void;
    setBookingsID: (id: string) => void;
    setBookingsDate: (date: Date) => void;
}

export const useBookingsStore = create<bookingsState>()((set) => ({
    showAddNewBookingsModal: false,
    showUpdateBookingsModal: false,
    showBookingsDeleteModal: false,
    bookingsId: "",
    bookingsDate: null,

    setShowNewBookingsModal: (newStatus) => set({ showAddNewBookingsModal: newStatus }),
    setShowUpdateBookingsModal: (newStatus) => set({ showUpdateBookingsModal: newStatus }),
    setShowBookingsDeleteModal: (newStatus) => set({ showBookingsDeleteModal: newStatus }),
    setBookingsID: (id) => set({ bookingsId: id }),
    setBookingsDate: (date) => set({ bookingsDate: date })
}));