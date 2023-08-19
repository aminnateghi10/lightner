export interface listCardsInterface {
    id: number,
    name: string,
    cards: CardsInterface []
}

export interface CardsInterface {
    id: number,
    persian: string,
    english: string,
    date_added: Date,
    browsing_time:number,
    browsing_count: number,
    correct_review: number,
    wrong_review: number,
    level: number,
}
