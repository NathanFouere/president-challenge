/*
* Prefix /api for api server
*/
const prefix: string = 'api';

const Routes = {
  User: {
    Register: () => `${prefix}/register`,
    Login: () => `${prefix}/login`,
    Me: () => `${prefix}/me`,
  },
};

export default Routes;
