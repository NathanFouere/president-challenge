import type FindElectionOfTypeForGameAtTurnQuery
  from '#election/application/query/find_election_of_type_for_game_at_turn_query';
import type Election from '#election/domain/model/election';

export default abstract class IFindElectionOfTypeForGameAtTurnQueryHandler {
  public abstract handle(query: FindElectionOfTypeForGameAtTurnQuery): Promise<Election | null>;
}
