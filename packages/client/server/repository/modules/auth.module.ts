import type { UserDto } from '@president-challenge/shared/dist/user/user-dto';
import FetchFactory from '../factory';
import Routes from '../routes.client';

class AuthModule extends FetchFactory {
  private readonly RESOURCE = Routes.User;

  public async signup(email: string, fullName: string, password: string): Promise<UserDto> {
    return this.call<UserDto>(
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

  public async login(email: string, password: string): Promise<UserDto> {
    return this.call<UserDto>(
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

  public async me(): Promise<UserDto> {
    return this.call<UserDto>(
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
