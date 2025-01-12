import type { LawType } from '@shared/legislature/law-type';

const prefix: string = 'api';
const authPrefix: string = `${prefix}/auth`;
const gamePrefix: string = `${prefix}/games`;
const politicalPartyPrefix: string = `${prefix}/political-party`;
const eventPrefix: string = `${prefix}/events`;
const legislaturePrefix: string = `${prefix}/legislature`;
const socialClassPrefix: string = `${prefix}/social-class`;
const productPrefix: string = `${prefix}/products`;
const sectorPrefix: string = `${prefix}/sectors`;
const statePrefix: string = `${prefix}/state`;

const Routes = {
  User: {
    Signup: () => `${authPrefix}/signup`,
    Login: () => `${authPrefix}/login`,
    Me: () => `${authPrefix}/me`,
    Logout: () => `${authPrefix}/logout`,
  },
  Game: {
    GetGames: () => `${gamePrefix}/`,
    CreateGame: () => `${gamePrefix}/create`,
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
    GetLaw: (gameId: number, lawId: number, type: LawType) => `${legislaturePrefix}/law/${gameId}/${lawId}/${type}`,
    VoteLaw: (gameId: number, lawId: number, type: LawType) => `${legislaturePrefix}/vote-law/${gameId}/${lawId}/${type}`,
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
  },
};

export default Routes;
