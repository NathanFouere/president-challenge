import { inject } from '@adonisjs/core';
import Law from '#law/domain/model/law';
import type GetLawByGameQuery from '#law/application/query/get_law_by_game_and_type_query';
import type {
  IGetLawByGameQueryHandler,
} from '#law/application/query/i_get_law_by_game_query_handler';

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
      queryBuilder.preload('lawVotes', (query) => {
        query.preload('voteResultsInSenate', (subQuery) => {
          subQuery.preload('politicalPartiesVoteResults', (subSubQuery) => {
            subSubQuery.preload('politicalParty');
          });
        });
        query.preload('voteResultsInParliament', (subQuery) => {
          subQuery.preload('politicalPartiesVoteResults', (subSubQuery) => {
            subSubQuery.preload('politicalParty');
          });
        });
      });
      queryBuilder.preload('lawGroup', (lawQuery) => {
        lawQuery.preload('laws');
      });
    }

    if (preloadOptions.lawVotes) {
      queryBuilder.preload('lawVotes', (query) => {
        query.preload('voteResultsInSenate', (subQuery) => {
          subQuery.preload('politicalPartiesVoteResults', (subSubQuery) => {
            subSubQuery.preload('politicalParty');
          });
        });
        query.preload('voteResultsInParliament', (subQuery) => {
          subQuery.preload('politicalPartiesVoteResults', (subSubQuery) => {
            subSubQuery.preload('politicalParty');
          });
        });
      });
      queryBuilder.preload('percentagesOfVotesForPoliticalParty', (query) => {
        query.preload('politicalParty', (politicalPartyQuery) => {
          politicalPartyQuery.preload('senateSeats');
          politicalPartyQuery.preload('parliamentSeats');
        });
      });
      queryBuilder.preload('lawEffect', (lawEffectQuery) => {
        lawEffectQuery.preload('socialClassesHappinessEffects');
        lawEffectQuery.preload('politicalPartiesAffiliationHappinessEffects');
      });
      queryBuilder.preload('lawGroup');
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
