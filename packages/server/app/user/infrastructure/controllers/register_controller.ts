import type { HttpContext } from '@adonisjs/core/http';
import { inject } from '@adonisjs/core';
import { aUser } from '#user/application/builders/user_builder';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { UserRepository } from '#user/infrastructure/repositories/user_repository';

@inject()
export default class RegisterController {
  constructor(
    private readonly userRepository: UserRepository,
  ) {
  }

  async signup({ request, auth, response }: HttpContext) {
    const { email, password, fullName } = request.only(['email', 'password', 'fullName']);

    try {
      const user = aUser()
        .withEmail(email)
        .withPassword(password)
        .withFullName(fullName)
        .build();

      await this.userRepository.save(user);

      await auth.use('web').login(user);

      return user;
    }
    catch (error) {
      return response.internalServerError({ message: 'Something went wrong', error });
    }
  }
}
