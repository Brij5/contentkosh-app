import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
  loading: false,
  sidebarOpen: false,
  toasts: [],
  modal: {
    isOpen: false,
    type: null,
    props: null
  }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    addToast: (state, action) => {
      state.toasts.push({
        id: Date.now(),
        ...action.payload,
        duration: action.payload.duration || 5000
      });
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
    },
    clearToasts: (state) => {
      state.toasts = [];
    },
    openModal: (state, action) => {
      state.modal = {
        isOpen: true,
        type: action.payload.type,
        props: action.payload.props
      };
    },
    closeModal: (state) => {
      state.modal = {
        isOpen: false,
        type: null,
        props: null
      };
    }
  }
});

export const {
  toggleTheme,
  setTheme,
  setLoading,
  toggleSidebar,
  setSidebarOpen,
  addToast,
  removeToast,
  clearToasts,
  openModal,
  closeModal
} = uiSlice.actions;

// Selectors
export const selectTheme = (state) => state.ui.theme;
export const selectLoading = (state) => state.ui.loading;
export const selectSidebarOpen = (state) => state.ui.sidebarOpen;
export const selectToasts = (state) => state.ui.toasts;
export const selectModal = (state) => state.ui.modal;

export default uiSlice.reducer;