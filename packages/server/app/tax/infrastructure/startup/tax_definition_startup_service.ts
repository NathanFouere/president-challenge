import { inject } from '@adonisjs/core';
import taxStartupConfig from '#game-config/tax/tax-startup-config.json' assert { type: 'json' };
import { aTaxDefinition } from '#tax/application/builder/tax_definition_builder';
import type { TaxType } from '#tax/domain/model/tax_type';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ITaxDefinitionRepository from '#tax/domain/repository/i_tax_definition_repository';
import type TaxDefinition from '#tax/domain/model/tax_definition';

@inject()
export class TaxDefinitionStartupService {
  constructor(
    private readonly taxDefinitionRepository: ITaxDefinitionRepository,
  ) {
  }

  public async execute(): Promise<void> {
    const taxes: TaxDefinition[] = [];
    for (const taxConfigValue of taxStartupConfig) {
      taxes.push(
        aTaxDefinition()
          .withName(taxConfigValue.name)
          .withDescription(taxConfigValue.description)
          .withType(taxConfigValue.type as TaxType)
          .withDefaultLevel(taxConfigValue.level)
          .withBaseRate(taxConfigValue.baseRate)
          .withColor(taxConfigValue.color)
          .build(),
      );
    }
    await this.taxDefinitionRepository.createMany(taxes);
  }
}
