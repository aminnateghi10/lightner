import { CardsInterface } from "./list";

export type RootStackParamList = {
  Home: undefined,
  CardsItems: { listName: string },
  AddNewCard: undefined,
  EditCard: { data: CardsInterface, listName: string },
  ShowCard: { data: CardsInterface, listName: string }
}
