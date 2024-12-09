/*
* Prefix /api for api server
*/
const prefix: string = 'api';
const authPrefix: string = `${prefix}/auth`;
const gamePrefix: string = `${prefix}/games`;
const politicalPartyPrefix: string = `${prefix}/political-party`;
const eventPrefix: string = `${prefix}/events`;

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
};

export default Routes;
