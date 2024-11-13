import User from '#models/user';
import type { HttpContext } from '@adonisjs/core/http';

export default class SessionController {
  async register({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password']);

    try {
      const user = await User.verifyCredentials(email, password);

      await auth.use('web').login(user);



    } catch {
      return response.unauthorized('Invalid credentials');
    }
  }

  async store({ request, auth, response }: HttpContext) {
    const { email, password, fullName } = request.only(['email', 'password', 'fullName']);

    const user = new User();
    user.email = email;
    user.password = password;
    user.fullName = fullName;

    await user.save();

    await auth.use('web').login(user);
  }
}
