import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import StateRepository from '#state/infrastructure/repository/state_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IStateFinancialFlowRepository from '#state/domain/repository/i_state_financial_flow_repository';
import type State from '#state/domain/model/state';

@inject()
export default class StateSaveForTurnService {
  constructor(
    private readonly stateRepository: StateRepository,
    private readonly stateFinancialFlowRepository: IStateFinancialFlowRepository,
  ) {
  }

  public async save(state: State): Promise<void> {
    await this.stateRepository.save(state);
    await this.stateFinancialFlowRepository.createMany(state.financialFlows);
  }
}
