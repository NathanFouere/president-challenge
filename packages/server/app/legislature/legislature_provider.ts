import AppProvider from '#common/provider';
import IGetSenateByGameQueryHandler from '#legislature/application/query/i_get_senate_by_game_query_handler';
import ISenateRepository from '#legislature/domain/repository/i_senate_repository';
import IParliamentRepository from '#legislature/domain/repository/i_parliament_repository';
import IPoliticalPartySeatsSenateRepository
  from '#legislature/domain/repository/i_politcal_party_seats_senate_repository';
import IPoliticalPartySeatsParliamentRepository
  from '#legislature/domain/repository/i_political_party_seats_parliament_repository';
import IGetParliamentByGameQueryHandler from '#legislature/application/query/i_get_parliament_by_game_query_handler';
import ILawRepository from '#legislature/domain/repository/i_law_repository';
import ILawGroupRepository from '#legislature/domain/repository/i_law_group_repository';
import IGetLawGroupsByGameQueryHandler from '#legislature/application/query/i_get_law_groups_by_game_query_handler';
import ILawCategoryRepository from '#legislature/domain/repository/i_law_category_repository';
import IGetLawCategoriesByGameQueryHandler
  from '#legislature/application/query/i_get_law_categories_by_game_query_handler';
import {
  IGetLawByGameAndTypeQueryHandler,
} from '#legislature/application/query/i_get_law_by_game_and_type_query_handler';
import {
  IGetPoliticalPartyPerAffiliationInGameQueryHandler,
} from '#political-party/application/queries/i_get_political_party_per_affiliation_in_game_query_handler';
import {
  ILawVotesPercentagePerPoliticalPartyRepository,
} from '#legislature/domain/repository/i_law_votes_percentage_per_political_party_repository';

export default class LegislatureProvider extends AppProvider {
  public async boot() {
    const { default: GetSenateByGameQueryHandler } = await import(
      '#legislature/infrastructure/query/get_senate_by_game_query_handler'
    );
    const { default: GetParliamentByGameQueryHandler } = await import(
      '#legislature/infrastructure/query/get_parliament_by_game_query_handler'
    );
    const { default: SenateRepository } = await import(
      '#legislature/infrastructure/repositories/senate_repository'
    );
    const { default: ParliamentRepository } = await import(
      '#legislature/infrastructure/repositories/parliament_repository'
    );
    const { default: PoliticalPartySeatsParliamentRepository } = await import(
      '#legislature/infrastructure/repositories/political_party_seats_parliament_repository'
    );
    const { default: PoliticalPartySeatsSenateRepository } = await import(
      '#legislature/infrastructure/repositories/political_party_seats_senate_repository'
    );
    const { default: LawRepository } = await import(
      '#legislature/infrastructure/repositories/law_repository'
    );
    const { default: LawGroupRepository } = await import(
      '#legislature/infrastructure/repositories/law_group_repository'
    );
    const { default: GetLawGroupsByGameQueryHandler } = await import(
      '#legislature/infrastructure/query/get_law_groups_by_game_query_handler'
    );
    const { default: LawCategoryRepository } = await import(
      '#legislature/infrastructure/repositories/law_category_repository'
    );
    const { default: GetLawCategoriesByGameQueryHandler } = await import(
      '#legislature/infrastructure/query/get_law_categories_by_game_query_handler'
    );
    const { default: GetLawByGameAndTypeQueryHandler } = await import(
      '#legislature/infrastructure/query/get_law_by_game_and_type_query_handler'
    );
    const { default: GetPoliticalPartyPerAffiliationInGameQueryHandler } = await import(
      '#political-party/infrastructure/query/get_political_party_per_affiliation_in_game_query_handler'
    );
    const { default: LawVotesPercentagePerPoliticalPartyRepository } = await import(
      '#legislature/infrastructure/repositories/law_votes_percentage_per_political_party_repository'
    );

    this.app.container.bind(IGetSenateByGameQueryHandler, () => {
      return new GetSenateByGameQueryHandler();
    });
    this.app.container.bind(IGetParliamentByGameQueryHandler, () => {
      return new GetParliamentByGameQueryHandler();
    });
    this.app.container.bind(ISenateRepository, () => {
      return new SenateRepository();
    });
    this.app.container.bind(IParliamentRepository, () => {
      return new ParliamentRepository();
    });
    this.app.container.bind(IPoliticalPartySeatsParliamentRepository, () => {
      return new PoliticalPartySeatsParliamentRepository();
    });
    this.app.container.bind(IPoliticalPartySeatsSenateRepository, () => {
      return new PoliticalPartySeatsSenateRepository();
    });
    this.app.container.bind(ILawRepository, () => {
      return new LawRepository();
    });
    this.app.container.bind(ILawGroupRepository, () => {
      return new LawGroupRepository();
    });
    this.app.container.bind(IGetLawGroupsByGameQueryHandler, () => {
      return new GetLawGroupsByGameQueryHandler();
    });
    this.app.container.bind(ILawCategoryRepository, () => {
      return new LawCategoryRepository();
    });
    this.app.container.bind(IGetLawCategoriesByGameQueryHandler, () => {
      return new GetLawCategoriesByGameQueryHandler();
    });
    this.app.container.bind(IGetLawByGameAndTypeQueryHandler, () => {
      return new GetLawByGameAndTypeQueryHandler();
    });
    this.app.container.bind(IGetPoliticalPartyPerAffiliationInGameQueryHandler, () => {
      return new GetPoliticalPartyPerAffiliationInGameQueryHandler();
    });
    this.app.container.bind(ILawVotesPercentagePerPoliticalPartyRepository, () => {
      return new LawVotesPercentagePerPoliticalPartyRepository();
    });
  }
}
