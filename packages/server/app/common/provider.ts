import type { ApplicationService } from '@adonisjs/core/types';

export default abstract class AppProvider {
  constructor(protected app: ApplicationService) {
  }

  public abstract boot(): Promise<void>;
}
