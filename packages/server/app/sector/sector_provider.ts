import AppProvider from '#common/provider';
import ISectorEconomicalSituationPerTurnRepository
  from '#sector/domain/repository/i_sector_economical_situation_per_turn_repository';
import ISectorRepository from '#sector/domain/repository/i_sector_repository';
import IGetSectorsByGameQueryHandler from '#sector/application/query/i_get_sectors_by_game_query_handler';
import IGetSectorByGameAndIdQueryHandler from '#sector/application/query/i_get_sector_by_game_and_id_query_handler';
import IGetSectorByGameAndTypeQueryHandler from '#sector/application/query/i_get_sector_by_game_and_type_query_handler';
import ISectorDefinitionRepository from '#sector/domain/repository/i_sector_definition_repository';

export default class SectorProvider extends AppProvider {
  public async boot(): Promise<void> {
    const { default: SectorRepository } = await import(
      '#sector/infrastructure/repository/sector_repository'
    );
    const { default: SectorEconomicalSituationPerTurnRepository } = await import(
      '#sector/infrastructure/repository/sector_economical_situation_per_turn_repository'
    );
    const { default: GetSectorByGameAndIdQueryHandler } = await import(
      '#sector/infrastructure/query/get_sector_by_game_and_id_query_handler'
    );
    const { default: GetSectorByGameAndTypeQueryHandler } = await import(
      '#sector/infrastructure/query/get_sector_by_game_and_type_query_handler'
    );
    const { default: GetSectorsByGameQueryHandler } = await import(
      '#sector/infrastructure/query/get_sectors_by_game_query_handler'
    );
    const { default: SectorDefinitionRepository } = await import(
      '#sector/infrastructure/repository/sector_definition_repository'
    );
    this.app.container.bind(ISectorDefinitionRepository, () => {
      return new SectorDefinitionRepository();
    });

    this.app.container.bind(ISectorRepository, () => {
      return new SectorRepository();
    });
    this.app.container.bind(ISectorEconomicalSituationPerTurnRepository, () => {
      return new SectorEconomicalSituationPerTurnRepository();
    });
    this.app.container.bind(IGetSectorByGameAndIdQueryHandler, () => {
      return new GetSectorByGameAndIdQueryHandler();
    });
    this.app.container.bind(IGetSectorByGameAndTypeQueryHandler, () => {
      return new GetSectorByGameAndTypeQueryHandler();
    });
    this.app.container.bind(IGetSectorsByGameQueryHandler, () => {
      return new GetSectorsByGameQueryHandler();
    });
  }
}
