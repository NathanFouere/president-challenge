import type { ApplicationService } from '@adonisjs/core/types';

export default abstract class AppProvider {
  protected constructor(protected app: ApplicationService) {
  }

  public abstract boot(): Promise<void>;
}
