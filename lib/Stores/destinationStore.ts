import { create } from "zustand";

interface destinationState {
    showAddNewDestinationModal: boolean;
    showUpdateDestinationModal: boolean;
    showDestinationDeleteModal: boolean
    destinationId: string;
    destinationName: string;
    destinationDescription: string;

    setShowNewDestinationModal: (newStatus: boolean) => void;
    setShowUpdateDestinationModal: (newStatus: boolean) => void;
    setShowDestinationDeleteModal: (newStatus: boolean) => void;
    setDestinationID: (id: string) => void;
    setDestinationName: (name: string) => void;
    setDestinationDescription: (description: string) => void
}

export const useDestinationStore = create<destinationState>()((set) => ({
    showAddNewDestinationModal: false,
    showUpdateDestinationModal: false,
    showDestinationDeleteModal: false,
    destinationId: "",
    destinationName: "",
    destinationDescription: "",
    setShowNewDestinationModal: (newStatus) => set({ showAddNewDestinationModal: newStatus }),
    setShowUpdateDestinationModal: (newStatus) => set({ showUpdateDestinationModal: newStatus }),
    setShowDestinationDeleteModal: (newStatus) => set({ showDestinationDeleteModal: newStatus }),
    setDestinationID: (id) => set({ destinationId: id }),
    setDestinationName: (name) => set({ destinationName: name }),
    setDestinationDescription: (description) => set({destinationDescription: description})
}));