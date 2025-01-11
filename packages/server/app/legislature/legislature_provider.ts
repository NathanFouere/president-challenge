import AppProvider from '#common/provider';
import IGetSenateByGameQueryHandler from '#legislature/application/query/i_get_senate_by_game_query_handler';
import ISenateRepository from '#legislature/domain/repository/i_senate_repository';
import IParliamentRepository from '#legislature/domain/repository/i_parliament_repository';
import IPoliticalPartySeatsSenateRepository
  from '#legislature/domain/repository/i_politcal_party_seats_senate_repository';
import IPoliticalPartySeatsParliamentRepository
  from '#legislature/domain/repository/i_political_party_seats_parliament_repository';
import IGetParliamentByGameQueryHandler from '#legislature/application/query/i_get_parliament_by_game_query_handler';
import IPropertyLawRepository from '#legislature/domain/repository/i_property_law_repository';
import ILawGroupRepository from '#legislature/domain/repository/i_law_group_repository';
import IGetLawGroupsByGameQueryHandler from '#legislature/application/query/i_get_law_groups_by_game_query_handler';
import ILawCategoryRepository from '#legislature/domain/repository/i_law_category_repository';
import IGetLawCategoriesByGameQueryHandler
  from '#legislature/application/query/i_get_law_categories_by_game_query_handler';
import IGetPropertyLawByIdAndGameQueryHandler from '#legislature/application/query/i_get_property_law_by_id_and_game_query_handler';

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
    const { default: PropertyLawRepository } = await import(
      '#legislature/infrastructure/repositories/property_law_repository'
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
    const { default: GetPropertyLawByIdAndGameQueryHandler } = await import(
      '#legislature/infrastructure/query/get_property_law_by_id_and_game_query_handler'
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
    this.app.container.bind(IPropertyLawRepository, () => {
      return new PropertyLawRepository();
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
    this.app.container.bind(IGetPropertyLawByIdAndGameQueryHandler, () => {
      return new GetPropertyLawByIdAndGameQueryHandler();
    });
  }
}
