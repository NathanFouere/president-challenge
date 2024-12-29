import AppProvider from '#common/provider';
import IPoliticalPartyRepository from '#political-party/domain/repository/i_political_party_repository';
import IGetPoliticalPartyOfGameQueryHandler
  from '#political-party/application/queries/i_get_political_party_of_game_query_handler';
import IGetPoliticalPartiesOfGameQueryHandler
  from '#political-party/application/queries/i_get_political_parties_of_game_query_handler';

export default class PoliticalPartyProvider extends AppProvider {
  public async boot(): Promise<void> {
    const { default: PoliticalPartyRepository } = await import(
      '#political-party/infrastructure/repositories/political_party_repository'
    );
    const { default: GetPoliticalPartiesOfGameQueryHandler } = await import(
      '#political-party/infrastructure/query/get_political_parties_of_game_query_handler'
    );
    const { default: GetPoliticalPartyOfGameQueryHandler } = await import(
      '#political-party/infrastructure/query/get_political_party_of_game_query_handler'
    );

    this.app.container.bind(IPoliticalPartyRepository, () => {
      return new PoliticalPartyRepository();
    });
    this.app.container.bind(IGetPoliticalPartiesOfGameQueryHandler, () => {
      return new GetPoliticalPartiesOfGameQueryHandler();
    });
    this.app.container.bind(IGetPoliticalPartyOfGameQueryHandler, () => {
      return new GetPoliticalPartyOfGameQueryHandler();
    });
  }
}
