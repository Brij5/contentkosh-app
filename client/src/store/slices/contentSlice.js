import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contents: [],
  content: null,
  loading: false,
  error: null,
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setContents: (state, action) => {
      state.contents = action.payload;
      state.loading = false;
      state.error = null;
    },
    setContent: (state, action) => {
      state.content = action.payload;
      state.loading = false;
      state.error = null;
    },
    addContent: (state, action) => {
      state.contents.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    updateContent: (state, action) => {
      const index = state.contents.findIndex(
        (content) => content._id === action.payload._id
      );
      if (index !== -1) {
        state.contents[index] = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    deleteContent: (state, action) => {
      state.contents = state.contents.filter(
        (content) => content._id !== action.payload
      );
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setError,
  setContents,
  setContent,
  addContent,
  updateContent,
  deleteContent,
} = contentSlice.actions;

export default contentSlice.reducer; 