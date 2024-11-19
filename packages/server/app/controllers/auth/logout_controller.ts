import type { HttpContext } from '@adonisjs/core/http';

export default class LogoutController {
  async handle({ response, auth }: HttpContext) {
    try {
      await auth.use('web').logout();
    }
    catch (error) {
      return response.internalServerError({ message: 'Something went wrong', error });
    }

    return response.ok({ message: 'Logged out successfully' });
  }
}
