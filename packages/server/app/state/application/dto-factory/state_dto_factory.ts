import { inject } from '@adonisjs/core';
import type { StateDto } from '@president-challenge/shared/dist/state/state-dto.js';
import type State from '#state/domain/model/state';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LicensedFileDTOFactory } from '#licensed-file/application/factory/licensed_file_dto_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ChartDataFactory from '#common/utils/chart_data_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import RangeLevelMatch from '#common/utils/range_level_match';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { MinimalBudgetDtoFactory } from '#budget/application/dto-factory/minimal_budget_dto_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import TaxDtoFactory from '#tax/application/dto-factory/tax_dto_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import FinancialFlowDataFactory from '#common/factory/financial_flow_data_factory';

@inject()
export class StateDtoFactory {
  constructor(
    private readonly licensedFileDtoFactory: LicensedFileDTOFactory,
    private readonly chartDataFactory: ChartDataFactory,
    private readonly rangeLevelMatch: RangeLevelMatch,
    private readonly budgetDtoFactory: MinimalBudgetDtoFactory,
    private readonly taxDtoFactory: TaxDtoFactory,
    private readonly financialFlowDtoFactory: FinancialFlowDataFactory,
  ) {
  }

  readonly economicalSituationRangeLevels = [
    { min: 0, max: 20, value: 'Very-Low' },
    { min: 20, max: 40, value: 'Low' },
    { min: 40, max: 60, value: 'Medium' },
    { min: 60, max: 80, value: 'High' },
    { min: 80, max: 100, value: 'Very-High' },
  ];

  public async createFromState(state: State): Promise<StateDto> {
    return {
      name: state.definition.name,
      description: state.definition.description,
      economicalSituation: this.mapEconomicalSituation(state.economicalSituation),
      flag: await this.licensedFileDtoFactory.createFromLicensedFile(state.definition.flag),
      economicalSituationPerMonthChartData: this.chartDataFactory.createLineCartFromSaveAmountPerTurn(
        state.economicalSituationPerTurn,
        'Economical Situation',
        0,
        100,
        this.economicalSituationRangeLevels,
      ),
      financialFlowDatas: this.financialFlowDtoFactory.generateFinancialFlowsDatasFromFinancialFlows(state.financialFlows),
      budgets: await this.budgetDtoFactory.createFromBudgets(state.budgets),
      taxes: this.taxDtoFactory.fromTaxes(state.taxes),
    };
  }

  private mapEconomicalSituation(economicalSituation: number): string {
    return this.rangeLevelMatch.createFromAmount(
      economicalSituation,
      this.economicalSituationRangeLevels,
    );
  }
}
