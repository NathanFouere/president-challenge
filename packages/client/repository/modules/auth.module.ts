import type { User } from '@shared/typesuser/user';
import FetchFactory from '../factory';
import Routes from '../routes.client';

class AuthModule extends FetchFactory {
  private readonly RESOURCE = Routes.User;

  async signup(email: string, fullName: string, password: string) {
    return this.call<User>(
      {
        method: 'POST',
        url: `${this.RESOURCE.Signup()}`,
        body: {
          email,
          fullName,
          password,
        },
      },
    );
  }

  async login(email: string, password: string) {
    return this.call<User>(
      {
        method: 'POST',
        url: `${this.RESOURCE.Login()}`,
        body: {
          email,
          password,
        },
      },
    );
  }

  async me() {
    return this.call<User>(
      {
        method: 'GET',
        url: `${this.RESOURCE.Me()}`,
      },
    );
  }

  async logout() {
    return this.call<User>(
      {
        method: 'GET',
        url: `${this.RESOURCE.Logout()}`,
      },
    );
  }
}

export default AuthModule;
