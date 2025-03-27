import type { HttpContext } from '@adonisjs/core/http';
import { inject } from '@adonisjs/core';
import User from '#user/domain/models/user';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import UserDtoFactory from '#user/application/dto-factory/user_dto_factory';

@inject()
export default class LoginController {
  constructor(
    private readonly userDtoFactory: UserDtoFactory,
  ) {
  }

  async login({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password']);

    try {
      const user: User | null = await User.verifyCredentials(email, password);

      await auth.use('web').login(user);

      const userDto = this.userDtoFactory.createFromUser(user);
      return userDto;
    }
    catch {
      return response.unauthorized('Invalid credentials');
    }
  }
}
