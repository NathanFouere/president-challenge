export default class GameMaxTurnError extends Error {
  static readonly code = '235056';
  constructor(
    public readonly gameId: number,
    public readonly turn: number,
  ) {
    super(`Game ID ${gameId} has reached max turn ${turn}`);
  }
}
