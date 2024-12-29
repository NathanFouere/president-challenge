import AppProvider from '#common/provider';
import IGetSenateByGameQueryHandler from '#legislature/application/query/i_get_senate_by_game_query_handler';
import ISenateRepository from '#legislature/domain/repository/i_senate_repository';
import IParliamentRepository from '#legislature/domain/repository/i_parliament_repository';
import IPoliticalPartySeatsSenateRepository
  from '#legislature/domain/repository/i_politcal_party_seats_senate_repository';
import IPoliticalPartySeatsParliamentRepository
  from '#legislature/domain/repository/i_political_party_seats_parliament_repository';
import IGetParliamentByGameQueryHandler from '#legislature/application/query/i_get_parliament_by_game_query_handler';

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
  }
}
