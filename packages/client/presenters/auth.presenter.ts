import { injectable } from 'inversify';
import 'reflect-metadata';
import { useUserStore } from '../store/user.store';
import { useUserLoginStore } from '../store/user-login.store';
import type AuthModule from '../repository/modules/auth.module';
import { useUserLogoutStore } from '../store/user-logout.store';
import { useUserSignupStore } from '../store/user-signup.store';
import { NUXT_ROUTES } from '../config/routes/nuxt-routes';

@injectable()
export class AuthPresenter {
  public readonly loginStore = useUserLoginStore();
  public readonly logoutStore = useUserLogoutStore();
  public readonly signupStore = useUserSignupStore();
  public readonly userStore = useUserStore();
  public readonly router = useRouter();
  public readonly authModule: AuthModule = useNuxtApp().$api.auth;

  public async login(email: string, password: string): Promise<void> {
    this.loginStore.setLogging();
    try {
      const user = await this.authModule.login(email, password);
      this.userStore.setUser(user);
      this.loginStore.unsetLogging();
      this.router.push(NUXT_ROUTES.home);
    }
    catch (error) {
      this.loginStore.setError('Error occured while logging in');
    }
  }

  public async logout(): Promise<void> {
    this.logoutStore.setLoggingOut();
    try {
      await this.authModule.logout();
      this.userStore.unsetUser();
      this.logoutStore.unsetLoggingOut();
      this.router.push(NUXT_ROUTES.login);
    }
    catch (error) {
      this.logoutStore.setError('Error occured while logging our');
    }
  }

  public async signup(email: string, fullname: string, password: string): Promise<void> {
    this.signupStore.setIsRegistering();
    try {
      const user = await this.authModule.signup(email, fullname, password);
      this.userStore.setUser(user);
      this.signupStore.unsetIsRegistering();
      this.router.push(NUXT_ROUTES.home);
    }
    catch (error) {
      this.signupStore.setError('Error occured while signing up');
    }
  }
}
