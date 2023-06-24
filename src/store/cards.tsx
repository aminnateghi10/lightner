import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CardsState {
  list: {
    id: number,
    name: string,
    cards: {
      id: number,
      persian: string,
      english: string,
    }[]
  }[];
}

const initialState: CardsState = {
  list: [
    {
      id: 2, name: "لیست 2",
      cards: [
        { id: 1, persian: "سلام", english: "hello" },
        { id: 2, persian: "سلام", english: "hello" },
        { id: 3, persian: "سلام", english: "hello" },
        { id: 4, persian: "سلام", english: "hello" },
        { id: 5, persian: "سلام", english: "hello" },
        { id: 6, persian: "سلام", english: "hello" }
      ]
    },
  ]
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state
    }
  }
});

// Action creators are generated for each case reducer function
export const { increment } = cardsSlice.actions;

export default cardsSlice.reducer;
