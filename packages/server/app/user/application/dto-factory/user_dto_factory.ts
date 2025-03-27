import type { UserDto } from '@president-challenge/shared/dist/user/user-dto.js';
import type User from '#user/domain/models/user';

export default class UserDtoFactory {
  public createFromUser(user: User): UserDto {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    };
  }
}
