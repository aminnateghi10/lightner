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
    }
  ]
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addNewList: (state, { payload }) => {
      return {
        ...state, list: [...state.list, {
          id: Date.now(),
          name: payload,
          cards: []
        }]
      };
    }
  }
});

// Action creators are generated for each case reducer function
export const { addNewList } = cardsSlice.actions;

export default cardsSlice.reducer;
