export interface StartupProcessorStep {
  execute(gameId: number, gameDefinitionIdentifier: string): Promise<void>;
}
