import type { User } from '@shared/typesuser/user';
import FetchFactory from '../factory';
import Routes from '../routes.client';

class AuthModule extends FetchFactory {
  private readonly RESOURCE = Routes.User;
  async authenticate() {
    return this.call<User>(
      {
        method: 'GET', url: `${this.RESOURCE.Authenticate()}`,
      },
    );
  }
}

export default AuthModule;
