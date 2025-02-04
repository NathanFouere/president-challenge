import type { GetLawVoteQuery } from '#law/application/query/get_law_vote_query';
import LawVote from '#law/domain/model/law_vote';
import type IGetLawVoteQueryHandler from '#law/application/query/i_get_law_vote_query_handler';

export default class GetLawVoteQueryHandler implements IGetLawVoteQueryHandler {
  public async handle(query: GetLawVoteQuery): Promise<LawVote> {
    return await LawVote.query()
      .where('id', query.lawVoteId)
      .where('law_id', query.lawId)
      .preload('voteResultsInParliament', (voteResultsInParliamentQuery) => {
        voteResultsInParliamentQuery.preload('politicalPartiesVoteResults');
      }).preload('voteResultsInSenate', (voteResultsInSenateQuery) => {
        voteResultsInSenateQuery.preload('politicalPartiesVoteResults');
      }).firstOrFail();
  }
}
