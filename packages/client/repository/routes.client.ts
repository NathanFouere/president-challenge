/*
* Prefix /api for api server
*/
const prefix: string = 'api';

const Routes = {
  User: {
    Authenticate: () => `${prefix}/test`,
  },
};

export default Routes;
