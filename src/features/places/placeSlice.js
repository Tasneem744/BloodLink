import { createSlice } from "@reduxjs/toolkit";
import data from "../../data/data.json";

const initialState = {
  centers: data.donation_places || [],
};

const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    setCenters: (state, action) => {
      state.centers = action.payload;
    },
  },
});

export const { setCenters } = placeSlice.actions;
export default placeSlice.reducer;
