export default class DuplicateLawVoteForTurnError extends Error {
  static readonly code = '23505';
  constructor(public readonly lawId: number, public readonly turn: number) {
    super(`Duplicate law vote for law ID ${lawId} and turn ${turn}`);
  }
}
