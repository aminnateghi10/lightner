import {CardsInterface, listCardsInterface} from "./list";

export type RootStackParamList = {
    Home: undefined,
    CardsItems: { listName: string },
    AddNewCard?: { data: CardsInterface },
    EditCard: { data: CardsInterface, listName: string },
    ShowCard: { data: CardsInterface, listName: string },
    Review: { data: listCardsInterface }
}
export type RootTabParamList = {
    LightnerTab: RootStackParamList,
    Settings: undefined,
    translate: undefined,
    Robot: undefined,
}
