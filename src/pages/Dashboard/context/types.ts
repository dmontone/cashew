export type DashboardState = {
  isLoading: false,
  isLoaded: false,
  isError: false,
  search?: string,
  cards: RegistrationType[]
}

export type DashboardActions = {
  setAllCards: RegistrationType[]
  addCard: RegistrationType
}