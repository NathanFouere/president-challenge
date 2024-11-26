import type User from '#user/domain/models/user';

export class UserRepository {
  public async save(user: User): Promise<void> {
    await user.save();
  }

  public async delete(user: User): Promise<void> {
    await user.delete();
  }
}
