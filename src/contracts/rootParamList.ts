import {CardsInterface, listCardsInterface} from "./list";

export type LightnerParamList = {
    Home: undefined,
    CardsItems: { listName: string },
    AddNewCard?: { data: CardsInterface },
    EditCard: { data: CardsInterface, listName: string },
    ShowCard: { data: CardsInterface, listName: string },
    Review: { data: listCardsInterface }
}
export type RootTabParamList = {
    Lightner: LightnerParamList,
    Setting: undefined,
    Translate: undefined,
    Robot: undefined,
}
