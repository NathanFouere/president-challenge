import type {
  IGetPoliticalPartyPerAffiliationInGameQueryHandler,
} from '#political-party/application/queries/i_get_political_party_per_affiliation_in_game_query_handler';
import PoliticalParty from '#political-party/domain/models/political_party';
import type GetPoliticalPartyPerAffiliationInGameQuery
  from '#political-party/application/queries/get_political_party_per_affiliation_in_game_query';

export default class GetPoliticalPartyPerAffiliationInGameQueryHandler implements IGetPoliticalPartyPerAffiliationInGameQueryHandler {
  private async getPoliticalPartyPerAffiliationInGame(
    query: GetPoliticalPartyPerAffiliationInGameQuery,
    preloadOptions: {
      senateSeats?: boolean;
      parliamentSeats?: boolean;
      happinessModifiers?: boolean;
    } = {},
  ): Promise<PoliticalParty> {
    const queryBuilder = PoliticalParty
      .query()
      .preload('definition')
      .whereHas('definition', (builder) => {
        builder.where('affiliation', query.politicalAffiliation);
      })
      .where('game_id', query.gameId);

    if (preloadOptions.senateSeats) {
      queryBuilder.preload('senateSeats');
    }

    if (preloadOptions.parliamentSeats) {
      queryBuilder.preload('parliamentSeats');
    }

    if (preloadOptions.happinessModifiers) {
      queryBuilder.preload('happinessModifiers');
    }

    return queryBuilder.firstOrFail();
  }

  public async handle(query: GetPoliticalPartyPerAffiliationInGameQuery): Promise<PoliticalParty> {
    return await this.getPoliticalPartyPerAffiliationInGame(query, {
      happinessModifiers: true,
    });
  }

  public async handleForVote(query: GetPoliticalPartyPerAffiliationInGameQuery): Promise<PoliticalParty> {
    return await this.getPoliticalPartyPerAffiliationInGame(query, {
      senateSeats: true,
      parliamentSeats: true,
    });
  }
}
