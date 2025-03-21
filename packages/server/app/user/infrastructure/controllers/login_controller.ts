import type { HttpContext } from '@adonisjs/core/http';
import User from '#user/domain/models/user';

export default class LoginController {
  async login({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password']);

    try {
      const user: User | null = await User.verifyCredentials(email, password);

      await auth.use('web').login(user);

      return user;
    }
    catch {
      return response.unauthorized('Invalid credentials');
    }
  }
}
