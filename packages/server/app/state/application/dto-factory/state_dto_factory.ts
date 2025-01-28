import { inject } from '@adonisjs/core';
import type { StateDto } from '@shared/dist/state/state-dto.js';
import type { ChartDataDTO } from '@shared/dist/chart/ChartDataDTO.js';
import type { FinancialFlowDatas } from '@shared/dist/state/financial_flow_datas.js';
import type State from '#state/domain/model/state';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LicensedFileDTOFactory } from '#licensed-file/application/factory/licensed_file_dto_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ChartDataFactory from '#common/utils/chart_data_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import RangeLevelMatch from '#common/utils/range_level_match';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { MinimalBudgetDtoFactory } from '#state/application/dto-factory/minimal_budget_dto_factory';
import type StateTurnFinancialFlows from '#state/domain/model/state_turn_financial_flows';
import type StateFinancialFlow from '#state/domain/model/state_financial_flow';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import TaxDtoFactory from '#tax/application/dto-factory/tax_dto_factory';

@inject()
export class StateDtoFactory {
  constructor(
    private readonly licensedFileDtoFactory: LicensedFileDTOFactory,
    private readonly chartDataFactory: ChartDataFactory,
    private readonly rangeLevelMatch: RangeLevelMatch,
    private readonly budgetDtoFactory: MinimalBudgetDtoFactory,
    private readonly taxDtoFactory: TaxDtoFactory,
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
      financialFlowDatas: this.createFinancialFlowsChartData(state.turnFinancialFlows),
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

  private createFinancialFlowsChartData(turnFinancialFlows: StateTurnFinancialFlows[]): FinancialFlowDatas[] {
    return turnFinancialFlows.map(turnFinancialFlow => this.createFinancialFlowChartData(turnFinancialFlow));
  }

  private createFinancialFlowChartData(stateTurnFinancialFlows: StateTurnFinancialFlows): FinancialFlowDatas {
    const positiveFlows = [];
    const negativeFlows = [];

    for (const flow of stateTurnFinancialFlows.financialFlows) {
      if (flow.amount >= 0) {
        positiveFlows.push(flow);
      }
      else {
        negativeFlows.push(flow);
      }
    }

    return {
      turn: stateTurnFinancialFlows.turn,
      positiveFinancialFlows: this.createChartDataFromFinancialFlows(positiveFlows, true),
      negativeFinancialFlows: this.createChartDataFromFinancialFlows(negativeFlows, false),
    };
  }

  private createChartDataFromFinancialFlows(
    financialFlows: StateFinancialFlow[],
    positive: boolean,
  ): ChartDataDTO {
    const labels = financialFlows.map(flow => flow.name);
    const data = financialFlows.map(flow => flow.amount);
    const backgroundColor = financialFlows.map(flow => flow.color);
    const borderColor = financialFlows.map(flow => flow.color);

    return {
      title: positive ? 'Incomes' : 'Expenses',
      labels,
      datasets: [{
        data,
        backgroundColor,
        borderColor,
      }],
    };
  }
}
