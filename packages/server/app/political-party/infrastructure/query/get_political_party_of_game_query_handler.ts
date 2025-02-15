import type IGetPoliticalPartyOfGameQueryHandler
  from '#political-party/application/queries/i_get_political_party_of_game_query_handler';
import type GetPoliticalPartyOfGameQuery from '#political-party/application/queries/get_political_party_of_game_query';
import PoliticalParty from '#political-party/domain/models/political_party';

export default class GetPoliticalPartyOfGameQueryHandler implements IGetPoliticalPartyOfGameQueryHandler {
  private async getPoliticalPartyOfGame(
    query: GetPoliticalPartyOfGameQuery,
    preloadOptions: {
      licensedFile?: boolean;
      happinessPerTurn?: boolean;
      happinessModifiers?: boolean;
      senateSeats?: boolean;
      parliamentSeats?: boolean;
    } = {},
  ): Promise<PoliticalParty> {
    const queryBuilder = PoliticalParty
      .query()
      .where('id', query.politicalPartyId)
      .where('game_id', query.gameId);

    queryBuilder.preload('definition', (definitionQuery) => {
      if (preloadOptions.licensedFile) {
        definitionQuery.preload('licensedFile');
      }

      if (preloadOptions.senateSeats) {
        queryBuilder.preload('senateSeats');
      }

      if (preloadOptions.parliamentSeats) {
        queryBuilder.preload('parliamentSeats');
      }
    });

    if (preloadOptions.happinessModifiers) {
      queryBuilder.preload('happinessModifiers');
    }

    if (preloadOptions.happinessPerTurn) {
      queryBuilder.preload('happinessPerTurn', (query) => {
        query.orderBy('turn', 'asc');
      });
    }

    return queryBuilder.firstOrFail();
  }

  public async handle(query: GetPoliticalPartyOfGameQuery): Promise<PoliticalParty> {
    return await this.getPoliticalPartyOfGame(query);
  }

  public async handleForDisplay(query: GetPoliticalPartyOfGameQuery): Promise<PoliticalParty> {
    return await this.getPoliticalPartyOfGame(query, {
      licensedFile: true,
      happinessPerTurn: true,
      happinessModifiers: true,
    });
  }

  public async handleForVote(query: GetPoliticalPartyOfGameQuery): Promise<PoliticalParty> {
    return await this.getPoliticalPartyOfGame(query, {
      senateSeats: true,
      parliamentSeats: true,
    });
  }
}
