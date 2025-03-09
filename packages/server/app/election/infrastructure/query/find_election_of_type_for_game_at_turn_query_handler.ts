import type FindElectionOfTypeForGameAtTurnQuery from '#election/application/query/find_election_of_type_for_game_at_turn_query';
import type IFindElectionOfTypeForGameAtTurnQueryHandler
  from '#election/application/query/i_find_election_of_type_for_game_at_turn_query_handler';
import Election from '#election/domain/model/election';

export default class FindElectionOfTypeForGameAtTurnQueryHandler implements IFindElectionOfTypeForGameAtTurnQueryHandler {
  public async handle(query: FindElectionOfTypeForGameAtTurnQuery): Promise<Election | null> {
    return await Election
      .query()
      .where('game_id', query.gameId)
      .where('type', query.electionType)
      .where('turn', query.turn)
      .preload('votesForPoliticalParties', (votesForPoliticalPartiesQuery) => {
        votesForPoliticalPartiesQuery.preload('politicalParty');
      })
      .first();
  }
}
