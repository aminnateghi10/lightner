export interface listCardsInterface {
    id: number,
    name: string,
    cards: CardsInterface []
}

export interface CardsInterface {
    id: number,
    persian: string,
    english: string,
}
