import { createSlice } from '@reduxjs/toolkit';
import data from '../../data/data.json';

const savedRequests = JSON.parse(localStorage.getItem('requests')) || data.requests;
const savedAccepted = JSON.parse(localStorage.getItem('acceptedRequests')) || [];

const requestSlice = createSlice({
  name: 'request',
  initialState: { 
    list: savedRequests,
    accepted: savedAccepted,
    isLoading: false,
    isError: false
  },

  reducers: {
    requestStart: (state) => {
      state.isLoading = true;
      state.isError = false;
    },

    requestSuccess: (state, action) => {
      state.list.push(action.payload);
      localStorage.setItem('requests', JSON.stringify(state.list));
      state.isLoading = false;
    },

    requestFail: (state) => {
      state.isLoading = false;
      state.isError = true;
    },

    resetRequestState: (state) => {
      state.isLoading = false;
      state.isError = false;
    },

    addAccept: (state, action) => {
      const { requestId, userPhone } = action.payload;

      const exists = state.accepted.some(
        a => a.requestId === requestId && a.userPhone === userPhone
      );
      if (exists) return;

      state.accepted.push({ requestId, userPhone });
      localStorage.setItem('acceptedRequests', JSON.stringify(state.accepted));

      const count = state.accepted.filter(a => a.requestId === requestId).length;
      const req = state.list.find(r => r.id === requestId);
      if (req && count >= 3 && req.state === "open") {
        req.state = "pending";
        localStorage.setItem('requests', JSON.stringify(state.list));
      }
    },

    updateState: (state, action) => {
      const req = state.list.find(r => r.id === action.payload.id);
      if (!req) return;
      if (req.state === "pending") return;

      if (action.payload.state === "open" || action.payload.state === "closed") {
        req.state = action.payload.state;
        localStorage.setItem('requests', JSON.stringify(state.list));
      }
    },
  },
});

export const { 
  requestStart, 
  requestSuccess, 
  requestFail,
  resetRequestState,
  addAccept,
  updateState
} = requestSlice.actions;

export default requestSlice.reducer;
