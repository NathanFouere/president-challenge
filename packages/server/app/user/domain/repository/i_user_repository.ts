import type User from '#user/domain/models/user';

export default abstract class IUserRepository {
  public abstract save(user: User): Promise<void>;
  public abstract delete(user: User): Promise<void>;
}
