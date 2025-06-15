const authPrefix: string = `/auth`;
const gamePrefix: string = `/games`;
const politicalPartyPrefix: string = `/political-party`;
const eventPrefix: string = `/events`;
const legislaturePrefix: string = `/legislature`;
const socialClassPrefix: string = `/social-class`;
const productPrefix: string = `/products`;
const sectorPrefix: string = `/sectors`;
const statePrefix: string = `/state`;

const Routes = {
  User: {
    Signup: () => `${authPrefix}/signup`,
    Login: () => `${authPrefix}/login`,
    Me: () => `${authPrefix}/me`,
    Logout: () => `${authPrefix}/logout`,
  },
  Game: {
    GetGames: () => `${gamePrefix}/`,
    GetGameDefinitions: () => `${gamePrefix}/definitions/`,
    GetGame: (id: number) => `${gamePrefix}/${id}`,
    CreateGame: (identifier: string) => `${gamePrefix}/create/${identifier}`,
    DeleteGame: (id: number) => `${gamePrefix}/delete/${id}`,
    ChangeTurn: (gameId: number) => `${gamePrefix}/change-turn/${gameId}`,
    GetTurnInformations: (gameId: number, turn: number) => `${gamePrefix}/turn-informations/${gameId}/${turn}`,
  },
  PoliticalParty: {
    GetPoliticalParties: (gameId: number) => `${politicalPartyPrefix}/political-parties-of-game/${gameId}`,
    GetPoliticalParty: (politicalPartyId: number, gameId: number) => `${politicalPartyPrefix}/${politicalPartyId}/game/${gameId}`,
  },
  Events: {
    GetEventsOfTurn: (gameId: number, turn: number) => `${eventPrefix}/events-of-turn/${gameId}/turn/${turn}`,
    GetEvent: (eventId: number, gameId: number) => `${eventPrefix}/${gameId}/${eventId}`,
    ChooseChoice: (eventId: number, choiceId: number) => `${eventPrefix}/choose-choice/${eventId}/${choiceId}`,
  },
  Legislature: {
    GetSenate: (gameId: number) => `${legislaturePrefix}/senate/${gameId}`,
    GetParliament: (gameId: number) => `${legislaturePrefix}/parliament/${gameId}`,
    GetLawCategories: (gameId: number) => `${legislaturePrefix}/law-categories/${gameId}`,
    GetLaw: (gameId: number, lawId: number) => `${legislaturePrefix}/law/${gameId}/${lawId}/`,
    VoteLaw: (gameId: number, lawId: number) => `${legislaturePrefix}/vote-law/${gameId}/${lawId}`,
  },
  SocialClass: {
    GetSocialClasses: (gameId: number) => `${socialClassPrefix}/${gameId}`,
    GetSocialClass: (socialClassId: number, gameId: number) => `${socialClassPrefix}/${gameId}/${socialClassId}`,
  },
  Product: {
    GetProducts: (gameId: number) => `${productPrefix}/${gameId}`,
    GetProduct: (productId: number, gameId: number) => `${productPrefix}/${gameId}/${productId}`,
  },
  Sector: {
    GetSectors: (gameId: number) => `${sectorPrefix}/${gameId}`,
    GetSector: (gameId: number, sectorId: number) => `${sectorPrefix}/${gameId}/${sectorId}`,
  },
  State: {
    GetState: (gameId: number) => `${statePrefix}/${gameId}`,
    GetBudget: (budgetId: number) => `${statePrefix}/budget/${budgetId}`,
  },
};

export default Routes;
