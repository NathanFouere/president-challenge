import type { User } from '@shared/dist//types/user/user';
import FetchFactory from '../factory';
import Routes from '../routes.client';

class AuthModule extends FetchFactory {
  private readonly RESOURCE = Routes.User;

  public async signup(email: string, fullName: string, password: string): Promise<User> {
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
  };

  public async login(email: string, password: string): Promise<User> {
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
  };

  public async me(): Promise<User> {
    return this.call<User>(
      {
        method: 'GET',
        url: `${this.RESOURCE.Me()}`,
      },
    );
  };

  public async logout(): Promise<void> {
    return this.call(
      {
        method: 'GET',
        url: `${this.RESOURCE.Logout()}`,
      },
    );
  };
}

export default AuthModule;
