import PoliticalParty from '#political-party/domain/models/political_party';
import type GetPoliticalPartiesOfGameQuery from '#political-party/application/queries/get_political_parties_of_game_query';
import type IGetPoliticalPartiesOfGameQueryHandler
  from '#political-party/application/queries/i_get_political_parties_of_game_query_handler';

export default class GetPoliticalPartiesOfGameQueryHandler implements IGetPoliticalPartiesOfGameQueryHandler {
  private async getPoliticalParties(
    query: GetPoliticalPartiesOfGameQuery,
    preloadOptions: { licensedFiles?: boolean; happinessModifiers?: boolean } = {},
  ): Promise<PoliticalParty[]> {
    const queryBuilder = PoliticalParty.query().where('game_id', query.gameId);

    if (preloadOptions.licensedFiles) {
      queryBuilder.preload('licensedFile');
    }

    if (preloadOptions.happinessModifiers) {
      queryBuilder.preload('happinessModifiers');
    }

    return queryBuilder.exec();
  }

  public async handle(query: GetPoliticalPartiesOfGameQuery): Promise<PoliticalParty[]> {
    return this.getPoliticalParties(query, {
      licensedFiles: true,
    });
  }

  public async handleForDisplay(query: GetPoliticalPartiesOfGameQuery): Promise<PoliticalParty[]> {
    return this.getPoliticalParties(query, {
      licensedFiles: true,
    });
  }

  public async handleForSwitchTurn(query: GetPoliticalPartiesOfGameQuery): Promise<PoliticalParty[]> {
    return this.getPoliticalParties(query, {
      licensedFiles: true,
      happinessModifiers: true,
    });
  }
}
