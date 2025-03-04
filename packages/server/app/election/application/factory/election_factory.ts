import type Game from '#game/domain/models/game';
import Election from '#election/domain/model/election';
import type { ElectionType } from '#election/domain/model/election_type';

export default class ElectionFactory {
  public createElectionForGame(game: Game, electionType: ElectionType) {
    const election = new Election();
    election.gameId = game.id;
    election.turn = game.turn;
    election.type = electionType;
    return election;
  }
}
