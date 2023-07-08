import { createSlice, current } from "@reduxjs/toolkit";
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
  list: []
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    initCardsData: (state, { payload }) => {
      if (payload.list) {
        state = payload;
        return state;
      } else return state;
    },
    addNewList: (state, { payload }) => {
      return {
        ...state, list: [...state.list, {
          id: Date.now(),
          name: payload,
          cards: []
        }]
      };
    },
    addNewCard: (state, { payload }) => {
      state.list = state.list.map((item) => {
        if (item.name == payload.listName) {
          item.cards = [...item.cards, { ...payload.newCard, id: Date.now() }];
        }
        return item;
      });
      console.log(current(state), "ssssss");
      return state;
    },
    deletCard: (state, { payload }) => {
      console.log(payload, "payload");
      console.log(current(state.list));
      state.list = [...state.list.map(item => {
        if (item.name === payload.listName) {
          return { ...item, cards: item.cards.filter(element => element.id != payload.id) };
        }
        return item;
      })];
      console.log(current(state));
      return state;
    }
  }
});

// Action creators are generated for each case reducer function
export const { initCardsData, addNewList, addNewCard, deletCard } = cardsSlice.actions;

export default cardsSlice.reducer;
