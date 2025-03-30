import { create } from 'zustand';

// Define the interface for the store's state and actions
interface UiState {
  isLoading: boolean;
  toggleLoading: () => void;
  setLoading: (loading: boolean) => void; // Added explicit setter for flexibility
}

// Create the store
export const useUiStore = create<UiState>((set) => ({
  // Initial state
  isLoading: false,

  // Actions
  toggleLoading: () => set((state) => ({ isLoading: !state.isLoading })),
  setLoading: (loading) => set({ isLoading: loading }),
}));

// No need for a separate default export if exporting the hook directly 