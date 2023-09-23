import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice, current } from "@reduxjs/toolkit";

interface ThemeStateInterface {
  mode: "auto" | "dark" | "light";
}

const initialState: ThemeStateInterface = {
  mode: "auto"
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    initTheme: (state, { payload }) => {
      state.mode = payload;
      return state;
    }
  }
});
export const { initTheme } = themeSlice.actions;

export default themeSlice.reducer;
