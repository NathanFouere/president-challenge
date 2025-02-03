import { inject } from '@adonisjs/core';
import Law from '#legislature/domain/models/law';
import type GetLawByGameAndTypeQuery from '#legislature/application/query/get_law_by_game_and_type_query';
import type {
  IGetLawByGameAndTypeQueryHandler,
} from '#legislature/application/query/i_get_law_by_game_and_type_query_handler';

@inject()
export default class GetLawByGameAndTypeQueryHandler implements IGetLawByGameAndTypeQueryHandler {
  private async getLawByGameAndType(
    query: GetLawByGameAndTypeQuery,
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
      queryBuilder.preload('lawGroup', (lawQuery) => {
        lawQuery.preload('laws');
      });
    }

    return await queryBuilder.firstOrFail();
  }

  public async handle(query: GetLawByGameAndTypeQuery): Promise<Law> {
    return await this.getLawByGameAndType(query);
  }

  public async handleForVote(query: GetLawByGameAndTypeQuery): Promise<Law> {
    return await this.getLawByGameAndType(query, { lawVotes: true });
  }

  public async handleForDisplay(query: GetLawByGameAndTypeQuery): Promise<Law> {
    return await this.getLawByGameAndType(query, { display: true });
  }
}
