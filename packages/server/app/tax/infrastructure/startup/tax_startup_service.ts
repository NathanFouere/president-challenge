import { inject } from '@adonisjs/core';
import type { StartupProcessorStep } from '#common/startup/startup_processor_step';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ITaxRepository from '#tax/domain/repository/i_tax_repository';
import { GetStateOfGameQuery } from '#state/application/query/get_state_of_game_query';
import type Tax from '#tax/domain/model/tax';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetStateOfGameQueryHandler from '#state/application/query/i_get_state_of_game_query_handler';
import { aTax } from '#tax/application/builder/tax_builder';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ITaxDefinitionRepository from '#tax/domain/repository/i_tax_definition_repository';

@inject()
export class TaxStartupService implements StartupProcessorStep {
  constructor(
    private readonly getStateOfGameQueryHandler: IGetStateOfGameQueryHandler,
    private readonly taxRepository: ITaxRepository,
    private readonly taxDefinitionRepository: ITaxDefinitionRepository,
  ) {
  }

  public async execute(gameId: number): Promise<void> {
    const taxDefinitions = await this.taxDefinitionRepository.findAll();
    const state = await this.getStateOfGameQueryHandler.handle(new GetStateOfGameQuery(
      gameId,
    ));
    const taxes: Tax[] = [];
    for (const taxConfigValue of taxDefinitions) {
      taxes.push(
        aTax()
          .withStateId(state.id)
          .withGameId(gameId)
          .withBaseRate(taxConfigValue.defaultRate)
          .withLevel(taxConfigValue.defaultLevel)
          .withDefinitionId(taxConfigValue.id)
          .build(),
      );
    }
    await this.taxRepository.createMany(taxes);
  }
}
