import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import StartupPipelineFactory from '#common/startup/startup_pipeline_factory';

@inject()
export class StartupService {
  constructor(
    private readonly startupPipelineFactory: StartupPipelineFactory,
  ) {
  }

  public async initialize(gameId: number): Promise<void> {
    try {
      const pipeline = this.startupPipelineFactory.create(gameId);
      await pipeline.execute();
    }
    catch (error) {
      console.error(error);
      throw new Error('Failed to initialize game');
    }
  }
}
