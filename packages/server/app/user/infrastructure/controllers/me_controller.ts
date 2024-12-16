import type { HttpContext } from '@adonisjs/core/http';

export default class MeController {
  public async me({ auth, response }: HttpContext) {
    try {
      return auth.getUserOrFail();
    }
    catch (error) {
      return response.internalServerError({ message: 'Something went wrong', error });
    }
  }
}
