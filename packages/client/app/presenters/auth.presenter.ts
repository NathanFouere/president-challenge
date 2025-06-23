import { injectable } from 'inversify';
import 'reflect-metadata';
import type AuthModule from '../../server/repository/modules/auth.module';
import { useUserStore } from '~/store/user/user.store';
import { useUserLoginStore } from '~/store/user/user-login.store';
import { useUserLogoutStore } from '~/store/user/user-logout.store';
import { useUserSignupStore } from '~/store/user/user-signup.store';
import { NUXT_ROUTES } from '~~/config/routes/nuxt-routes';
import { useCustomToast } from '~/composables/useCustomToast';

@injectable()
export class AuthPresenter {
  public readonly loginStore = useUserLoginStore();
  public readonly logoutStore = useUserLogoutStore();
  public readonly signupStore = useUserSignupStore();
  public readonly userStore = useUserStore();
  public readonly router = useRouter();
  public readonly authModule: AuthModule = useNuxtApp().$api.auth;
  public readonly toast = useCustomToast();

  public async login(email: string, password: string): Promise<void> {
    try {
      await this.handleLogin(email, password);
      this.toast.showSuccess('Login successful!');
    }
    catch {
      this.toast.showError('Error occurred while logging in');
    }
  }

  public async logout(): Promise<void> {
    try {
      await this.handleLogout();
      this.toast.showSuccess('Logged out successfully!');
    }
    catch {
      this.toast.showError('Error occurred while logging out');
    }
  }

  public async signup(email: string, fullname: string, password: string): Promise<void> {
    try {
      await this.handleSignup(email, fullname, password);
      this.toast.showSuccess('Signup successful!');
    }
    catch {
      this.toast.showError('Error occurred while signing up');
    }
  }

  private async handleLogin(email: string, password: string): Promise<void> {
    this.loginStore.setLogging();
    try {
      const user = await this.authModule.login(email, password);
      this.userStore.setUser(user);

      await navigateTo(NUXT_ROUTES.games, { external: true });
    }
    catch {
      this.toast.showError('Error while logging in');
    }
    finally {
      this.loginStore.unsetLogging();
    }
  }

  private async handleLogout(): Promise<void> {
    this.logoutStore.setLoggingOut();
    try {
      await this.authModule.logout();
      this.userStore.unsetUser();
    }
    finally {
      this.logoutStore.unsetLoggingOut();
    }
    this.router.push(NUXT_ROUTES.login);
  }

  private async handleSignup(email: string, fullname: string, password: string): Promise<void> {
    this.signupStore.setIsRegistering();
    try {
      const user = await this.authModule.signup(email, fullname, password);
      this.userStore.setUser(user);
    }
    finally {
      this.signupStore.unsetIsRegistering();
    }
    this.router.push(NUXT_ROUTES.games);
  }
}
