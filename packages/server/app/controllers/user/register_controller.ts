import type { HttpContext } from '@adonisjs/core/http';
import { aUser } from '#builders/user/user_builder';

export default class RegisterController {
  async signup({ request, auth, response }: HttpContext) {
    const { email, password, fullName } = request.only(['email', 'password', 'fullName']);

    try {
      const user = aUser()
        .withEmail(email)
        .withPassword(password)
        .withFullName(fullName)
        .build();

      await user.save();

      await auth.use('web').login(user);

      return user;
    }
    catch (error) {
      return response.internalServerError({ message: 'Something went wrong', error });
    }
  }
}
