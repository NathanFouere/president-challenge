export default class GameInFinishedStatusError extends Error {
  static readonly code = '235058';
  constructor(
    public readonly gameId: number,
  ) {
    super(`Game ID ${gameId} is in finished status`);
  }
}
