import * as console from 'node:console';
import { inject } from '@adonisjs/core';
import type { StartupProcessorStep } from '#common/startup/startup_processor_step';
import taxStartupConfig from '#game-config/tax/tax-startup-config.json' assert { type: 'json' };
import { aTax } from '#tax/application/builder/tax_builder';
import type { TaxType } from '#tax/domain/model/tax_type';
import type { TaxLevel } from '#tax/domain/model/tax_level';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ITaxRepository from '#tax/domain/repository/i_tax_repository';
import { GetStateOfGameQuery } from '#state/application/query/get_state_of_game_query';
import type Tax from '#tax/domain/model/tax';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetStateOfGameQueryHandler from '#state/application/query/i_get_state_of_game_query_handler';

@inject()
export class TaxStartupService implements StartupProcessorStep {
  constructor(
    private readonly getStateOfGameQueryHandler: IGetStateOfGameQueryHandler,
    private readonly taxRepository: ITaxRepository,
  ) {
  }

  public async execute(gameId: number): Promise<void> {
    const state = await this.getStateOfGameQueryHandler.handle(new GetStateOfGameQuery(
      gameId,
    ));
    const taxes: Tax[] = [];
    for (const taxConfigValue of taxStartupConfig) {
      taxes.push(
        aTax()
          .withName(taxConfigValue.name)
          .withDescription(taxConfigValue.description)
          .withColor(taxConfigValue.color)
          .withType(taxConfigValue.type as TaxType)
          .withLevel(taxConfigValue.level as TaxLevel)
          .withStateId(state.id)
          .build(),
      );
    }
    console.log(taxes);
    await this.taxRepository.createMany(taxes);
  }
}
