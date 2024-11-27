/*
* Prefix /api for api server
*/
const prefix: string = 'api';
const authPrefix: string = `${prefix}/auth`;
const gamePrefix: string = `${prefix}/games`;
const politicalPartyPrefix: string = `${prefix}/political-parties`;

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
  },
};

export default Routes;
