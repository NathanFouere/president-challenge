/*
* Prefix /api for api server
*/
const prefix: string = 'api';

const Routes = {
  User: {
    Signup: () => `${prefix}/signup`,
    Login: () => `${prefix}/login`,
    Me: () => `${prefix}/me`,
  },
};

export default Routes;
