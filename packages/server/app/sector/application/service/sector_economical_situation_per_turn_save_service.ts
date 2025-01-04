import { inject } from '@adonisjs/core';
import type Sector from '#sector/domain/model/sector';
import {
  aSectorEconomicalSituationPerTurn,
} from '#sector/application/builder/sector_economical_situation_per_turn_builder';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ISectorEconomicalSituationPerTurnRepository
  from '#sector/domain/repository/i_sector_economical_situation_per_turn_repository';

@inject()
export class SectorEconomicalSituationPerTurnSaveService {
  constructor(
    private readonly sectorEconomicalSituationPerTurnRepository: ISectorEconomicalSituationPerTurnRepository,
  ) {
  }

  public async saveSectorsEconomicalSituationForTurn(sectors: Sector[], turn: number): Promise<void> {
    const promises = sectors.map(sector => this.saveSectorEconomicalSituationForTurn(sector, turn));
    await Promise.all(promises);
  }

  public async saveSectorEconomicalSituationForTurn(sector: Sector, turn: number): Promise<void> {
    const sectorEconomicalSituationForTurn = aSectorEconomicalSituationPerTurn()
      .withSectorId(sector.id)
      .withAmount(sector.economicalSituation)
      .withTurn(turn)
      .build();

    await this.sectorEconomicalSituationPerTurnRepository.save(sectorEconomicalSituationForTurn);
  }
}
