import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SectorRepository from '#sector/infrastructure/repository/sector_repository';
import type SectorPropertyLawEffect from '#law/domain/model/law-effect/sector_property_law_effect';

@inject()
export default class ApplySectorPropertyLawEffectService {
  constructor(
    private readonly sectorRepository: SectorRepository,
  ) {
  }

  public async applySectorPropertyLawEffect(sectorPropertyLawEffect: SectorPropertyLawEffect): Promise<void> {
    sectorPropertyLawEffect.apply();

    await this.sectorRepository.save(sectorPropertyLawEffect.sector);
  }
}
