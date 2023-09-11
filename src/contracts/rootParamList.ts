import {CardsInterface, listCardsInterface} from "./list";

export type LightnerParamList = {
    Home: undefined,
    CardsItems: { listName: string },
    AddNewCard?: { data: CardsInterface },
    EditCard: { data: CardsInterface, listName: string },
    ShowCard: { data: CardsInterface, listName: string },
    Review: { data: listCardsInterface }
}

export type SettingParamList = {
    SettingPage: undefined,
    SupportPage: undefined,
    FeedbackPage: undefined,
}

export type TranslateParamList = {}

export type RobotParamList = {}

export type RootTabParamList = {
    Lightner: LightnerParamList,
    Setting: SettingParamList,
    Translate: TranslateParamList,
    Robot: RobotParamList,
}
