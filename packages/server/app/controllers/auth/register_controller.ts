import type { HttpContext } from '@adonisjs/core/http';
import User from '#models/user';

export default class RegisterController {
  async signup({ request, auth, response }: HttpContext) {
    const { email, password, fullName } = request.only(['email', 'password', 'fullName']);

    try {
      const user = new User();
      user.email = email;
      user.password = password;
      user.fullName = fullName;

      await user.save();

      await auth.use('web').login(user);

      return user;
    }
    catch (error) {
      return response.internalServerError({ message: 'Something went wrong', error });
    }
  }
}
