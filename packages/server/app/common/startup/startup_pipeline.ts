import type { StartupProcessorStep } from '#common/startup/startup_processor_step';

export class StartupPipeline {
  constructor(
    private readonly steps: StartupProcessorStep[],
    private readonly gameId: number,
    private readonly gameDefinitionIdentifier: string,
  ) {
  }

  public async execute(): Promise<void> {
    for (const step of this.steps) {
      await step.execute(this.gameId, this.gameDefinitionIdentifier);
    }
  }
}
