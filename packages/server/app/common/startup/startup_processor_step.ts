export interface StartupProcessorStep {
  execute(gameId: number): Promise<void>;
}
