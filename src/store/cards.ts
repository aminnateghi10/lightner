import {createSlice, current} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

import {listCardsInterface} from "../contracts/list";

interface CardsStateInterface {
    list: listCardsInterface[]
}

const initialState: CardsStateInterface = {
    list: []
};

export const cardsSlice = createSlice({
    name: "cards",
    initialState,
    reducers: {
        initCardsData: (state, {payload}) => {
            if (payload.list) {
                state = payload;
                return state;
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
            state.list = state.list.map((item) => {
                if (item.name == payload.listName) {
                    item.cards = [...item.cards, {
                        ...payload.newCard,
                        date_added: new Date(),
                        browsing_time: Date.now(),
                        browsing_count: 0,
                        correct_review: 0,
                        wrong_review: 0,
                        level: 1,
                    }];
                }
                return item;
            });
            return state;
        },
        deleteCard: (state, {payload}) => {
            state.list = [...state.list.map(item => {
                if (item?.name === payload?.listName) {
                    return {...item, cards: item.cards.filter(element => element.id != payload.id)};
                }
                return item;
            })];
            return state;
        },
        deleteList: (state, {payload}) => {
            state.list = [...state.list.filter(item => item.name !== payload)];
            return state;
        },
        cardLevelUpgrade: (state, {payload}) => {
            state.list = [...state.list.map(item => {
                return {
                    ...item,
                    cards: [...item?.cards.map((element => {
                        if (element.id === payload.id) return payload;
                        else return element
                    }))]
                }
            })];
            return state;
        },

    }
});

// Action creators are generated for each case reducer function
export const {initCardsData, addNewList, addNewCard, deleteCard, deleteList, cardLevelUpgrade} = cardsSlice.actions;

export default cardsSlice.reducer;
