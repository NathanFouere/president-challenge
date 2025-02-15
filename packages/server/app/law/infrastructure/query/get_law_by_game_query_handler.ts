import { inject } from '@adonisjs/core';
import type GetLawByGameQuery from '#law/application/query/get_law_by_game_and_type_query';
import type {
  IGetLawByGameQueryHandler,
} from '#law/application/query/i_get_law_by_game_query_handler';
import Law from '#law/domain/model/law';

@inject()
export default class GetLawByGameQueryHandler implements IGetLawByGameQueryHandler {
  private async getLawByGameAndType(
    query: GetLawByGameQuery,
    preloadOptions: { percentagesOfVotesForPoliticalParty?: boolean; lawVotes?: boolean; display?: boolean } = {},
  ): Promise<Law> {
    const queryBuilder = Law.query()
      .where('game_id', query.gameId)
      .where('id', query.lawId);

    if (preloadOptions.display) {
      queryBuilder.preload('votes', (votesQuery) => {
        votesQuery.preload('voteResultsInSenate', (senateResultsQuery) => {
          senateResultsQuery.preload('politicalPartiesVoteResults', (partyVoteResultsQuery) => {
            partyVoteResultsQuery.preload('politicalParty', (politicalPartyQuery) => {
              politicalPartyQuery.preload('definition');
            });
          });
        });
        votesQuery.preload('voteResultsInParliament', (parliamentResultsQuery) => {
          parliamentResultsQuery.preload('politicalPartiesVoteResults', (partyVoteResultsQuery) => {
            partyVoteResultsQuery.preload('politicalParty', (politicalPartyQuery) => {
              politicalPartyQuery.preload('definition');
            });
          });
        });
      });
      queryBuilder.preload('definition', (lawDefinitionQuery) => {
        lawDefinitionQuery.preload('lawGroup');
      });
    }

    if (preloadOptions.lawVotes) {
      queryBuilder.preload('votes', (votesQuery) => {
        votesQuery.preload('voteResultsInSenate', (senateResultsQuery) => {
          senateResultsQuery.preload('politicalPartiesVoteResults', (partyVoteResultsQuery) => {
            partyVoteResultsQuery.preload('politicalParty', (politicalPartyQuery) => {
              politicalPartyQuery.preload('definition');
            });
          });
        });
        votesQuery.preload('voteResultsInParliament', (parliamentResultsQuery) => {
          parliamentResultsQuery.preload('politicalPartiesVoteResults', (partyVoteResultsQuery) => {
            partyVoteResultsQuery.preload('politicalParty', (politicalPartyQuery) => {
              politicalPartyQuery.preload('definition');
            });
          });
        });
      });
      queryBuilder.preload('definition', (lawDefinitionQuery) => {
        lawDefinitionQuery.preload('socialClassesHappinessEffects');
        lawDefinitionQuery.preload('politicalPartiesAffiliationHappinessEffects');
        lawDefinitionQuery.preload('lawGroup');
        lawDefinitionQuery.preload('percentagesOfVotesForPoliticalParty');
      });
    }

    return await queryBuilder.firstOrFail();
  }

  public async handle(query: GetLawByGameQuery): Promise<Law> {
    return await this.getLawByGameAndType(query);
  }

  public async handleForVote(query: GetLawByGameQuery): Promise<Law> {
    return await this.getLawByGameAndType(query, { lawVotes: true });
  }

  public async handleForDisplay(query: GetLawByGameQuery): Promise<Law> {
    return await this.getLawByGameAndType(query, { display: true });
  }
}
