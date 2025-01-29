import { inject } from '@adonisjs/core';
import type { StateDto } from '@shared/dist/state/state-dto.js';
import type State from '#state/domain/model/state';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LicensedFileDTOFactory } from '#licensed-file/application/factory/licensed_file_dto_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ChartDataFactory from '#common/utils/chart_data_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import RangeLevelMatch from '#common/utils/range_level_match';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { MinimalBudgetDtoFactory } from '#state/application/dto-factory/minimal_budget_dto_factory';
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
    { min: 0, max: 5, value: 'Very-Low' },
    { min: 6, max: 8, value: 'Low' },
    { min: 9, max: 12, value: 'Medium' },
    { min: 13, max: 16, value: 'High' },
    { min: 17, max: 20, value: 'Very-High' },
  ];

  public createFromState(state: State): StateDto {
    return {
      name: state.name,
      description: state.description,
      economicalSituation: this.mapEconomicalSituation(state.economicalSituation),
      flag: this.licensedFileDtoFactory.createFromLicensedFile(state.flag),
      economicalSituationPerMonthChartData: this.chartDataFactory.createLineCartFromSaveAmountPerTurn(
        state.economicalSituationPerTurn,
        'Economical Situation',
        0,
        20,
        this.economicalSituationRangeLevels,
      ),
      financialFlowDatas: this.financialFlowDtoFactory.generateFinancialFlowsDatasFromFinancialFlows(state.financialFlows),
      budgets: this.budgetDtoFactory.createFromBudgets(state.budgets),
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
