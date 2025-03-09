import type { ElectionType } from '#election/domain/model/election_type';

export default class FindElectionOfTypeForGameAtTurnQuery {
  constructor(
    public readonly electionType: ElectionType,
    public readonly gameId: number,
    public readonly turn: number,
  ) {
  }
}
