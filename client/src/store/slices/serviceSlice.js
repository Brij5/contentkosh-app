import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  services: [],
  service: null,
  loading: false,
  error: null,
};

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setServices: (state, action) => {
      state.services = action.payload;
      state.loading = false;
      state.error = null;
    },
    setService: (state, action) => {
      state.service = action.payload;
      state.loading = false;
      state.error = null;
    },
    addService: (state, action) => {
      state.services.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    updateService: (state, action) => {
      const index = state.services.findIndex(
        (service) => service._id === action.payload._id
      );
      if (index !== -1) {
        state.services[index] = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    deleteService: (state, action) => {
      state.services = state.services.filter(
        (service) => service._id !== action.payload
      );
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setError,
  setServices,
  setService,
  addService,
  updateService,
  deleteService,
} = serviceSlice.actions;

export default serviceSlice.reducer; 