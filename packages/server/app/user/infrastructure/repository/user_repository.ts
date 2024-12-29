import type User from '#user/domain/models/user';
import type IUserRepository from '#user/domain/repository/i_user_repository';

export default class UserRepository implements IUserRepository {
  public async save(user: User): Promise<void> {
    await user.save();
  }

  public async delete(user: User): Promise<void> {
    await user.delete();
  }
}
