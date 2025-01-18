export default class DuplicateLawVoteForTurnError extends Error {
  constructor(public readonly lawId: number, public readonly turn: number) {
    super(`Duplicate law vote for law ID ${lawId} and turn ${turn}`);
  }
}
