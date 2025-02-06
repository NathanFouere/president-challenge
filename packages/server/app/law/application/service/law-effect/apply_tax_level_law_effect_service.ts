import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import TaxRepository from '#tax/infrastructure/repository/tax_repository';
import type TaxLevelLawEffect from '#law/domain/model/law-effect/tax_level_law_effect';

@inject()
export default class ApplyTaxLevelLawEffectService {
  constructor(
    private readonly taxRepository: TaxRepository,
  ) {
  }

  public async applyTaxLevelLawEffect(taxLevelLawEffect: TaxLevelLawEffect): Promise<void> {
    taxLevelLawEffect.apply();

    await this.taxRepository.save(taxLevelLawEffect.tax);
  }
}
