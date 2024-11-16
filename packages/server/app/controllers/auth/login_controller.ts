import type { HttpContext } from '@adonisjs/core/http';
import User from '#models/user';

export default class LoginController {
  async login({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password']);

    try {
      const user = await User.verifyCredentials(email, password);

      await auth.use('web').login(user);

      return user;
    }
    catch {
      return response.unauthorized('Invalid credentials');
    }
  }
}
