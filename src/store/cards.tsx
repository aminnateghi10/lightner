import {createSlice, current} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

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
        initCardsData: (state, {payload}) => {
            if (payload.list) {
                state = payload
                return state
            } else return state;
        },
        addNewList: (state, {payload}) => {
            return {
                ...state, list: [...state.list, {
                    id: Date.now(),
                    name: payload,
                    cards: []
                }]
            };
        },
        addNewCard: (state, {payload}) => {
            state.list.map((item) => {
                if (item.name == payload.listName) {
                    item.cards = [...item.cards, {...payload.newCard, id: Date.now()}]
                }
                return item
            });
            return state
        }
    }
});

// Action creators are generated for each case reducer function
export const {initCardsData, addNewList, addNewCard} = cardsSlice.actions;

export default cardsSlice.reducer;
