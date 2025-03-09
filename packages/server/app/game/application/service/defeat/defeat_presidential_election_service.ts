import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IFindElectionOfTypeForGameAtTurnQueryHandler
  from '#election/application/query/i_find_election_of_type_for_game_at_turn_query_handler';
import FindElectionOfTypeForGameAtTurnQuery
  from '#election/application/query/find_election_of_type_for_game_at_turn_query';
import { ElectionType } from '#election/domain/model/election_type';

@inject()
export default class DefeatPresidentialElectionService {
  constructor(
    private readonly findElectionOfTypeForGameAtTurnQueryHandler: IFindElectionOfTypeForGameAtTurnQueryHandler,
  ) {
  }

  public async checkDefeatPresidentialElection(gameId: number, turn: number): Promise<boolean> {
    const election = await this.findElectionOfTypeForGameAtTurnQueryHandler.handle(new FindElectionOfTypeForGameAtTurnQuery(
      ElectionType.PRESIDENTIAL,
      gameId,
      turn,
    ));

    if (!election) {
      return false;
    }

    return election.isADefeatForPartiesInPower();
  }
}
