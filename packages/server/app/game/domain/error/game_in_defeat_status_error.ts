export default class GameInDefeatStatusError extends Error {
  static readonly code = '235057';
  constructor(
    public readonly gameId: number,
  ) {
    super(`Game ID ${gameId} is in defeat status`);
  }
}
