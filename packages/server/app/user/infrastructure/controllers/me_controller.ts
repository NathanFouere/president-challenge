import type { HttpContext } from '@adonisjs/core/http';
import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import UserDtoFactory from '#user/application/dto-factory/user_dto_factory';

@inject()
export default class MeController {
  constructor(
    private readonly userDtoFactory: UserDtoFactory,
  ) {
  }

  public async me({ auth, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail();
      const userDto = this.userDtoFactory.createFromUser(user);

      return userDto;
    }
    catch (error) {
      return response.internalServerError({ message: 'Something went wrong', error });
    }
  }
}
