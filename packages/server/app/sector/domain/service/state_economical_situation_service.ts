import { inject } from '@adonisjs/core';
import type Sector from '#sector/domain/model/sector';
import type State from '#state/domain/model/state';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import StateFinancialFlowFactory from '#state/application/factory/state_financial_flow_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IStateFinancialFlowRepository from '#state/domain/repository/i_state_financial_flow_repository';

@inject()
export default class StateEconomicalSituationService {
  constructor(
    private readonly stateFinancialFlowFactory: StateFinancialFlowFactory,
    private readonly stateFinancialFlowRepository: IStateFinancialFlowRepository,
  ) {
  }

  public async updateStateEconomicalSituationFromSectors(sectors: Sector[], state: State, turn: number): Promise<void> {
    const generatedRevenueFromSectors = state.generateRevenueFromSectors(sectors);

    const stateFinancialFlowFromSectors = this.stateFinancialFlowFactory.createFromSector(generatedRevenueFromSectors, state, turn);
    await this.stateFinancialFlowRepository.save(stateFinancialFlowFromSectors);
  }
}
