export interface StartupInterface {
  initialize(gameId: number): Promise<void>;
}
