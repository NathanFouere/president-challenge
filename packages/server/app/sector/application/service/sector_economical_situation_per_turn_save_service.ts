import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  SectorEconomicalSituationPerTurnRepository,
} from '#sector/infrastructure/repository/sector_economical_situation_per_turn_repository';
import type Sector from '#sector/domain/model/sector';
import {
  aSectorEconomicalSituationPerTurn,
} from '#sector/application/builder/sector_economical_situation_per_turn_builder';

@inject()
export class SectorEconomicalSituationPerTurnSaveService {
  constructor(
    private readonly sectorEconomicalSituationPerTurnRepository: SectorEconomicalSituationPerTurnRepository,
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
