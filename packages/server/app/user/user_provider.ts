import AppProvider from '#common/provider';
import IUserRepository from '#user/domain/repository/i_user_repository';

export default class UserProvider extends AppProvider {
  public async boot(): Promise<void> {
    const { default: UserRepository } = await import(
      '#user/infrastructure/repository/user_repository'
    );

    this.app.container.bind(IUserRepository, () => {
      return new UserRepository();
    });
  }
}
