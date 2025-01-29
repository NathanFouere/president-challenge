import type { FinancialFlowDatas } from '@shared/dist/state/financial_flow_datas.js';
import type { ChartDataDTO } from '@shared/dist/chart/ChartDataDTO.js';
import type FinancialFlow from '#common/model/financial_flow';

export default class FinancialFlowDataFactory {
  public generateFinancialFlowsDatasFromFinancialFlows(financialFlows: FinancialFlow[]): FinancialFlowDatas[] {
    const financialFlowsDatas: FinancialFlowDatas[] = [];

    const groupedByTurn = new Map<number, FinancialFlow[]>();

    for (const financialFlow of financialFlows) {
      if (!groupedByTurn.has(financialFlow.turn)) {
        groupedByTurn.set(financialFlow.turn, []);
      }
      groupedByTurn.get(financialFlow.turn)!.push(financialFlow);
    }

    for (const [turn, flows] of groupedByTurn.entries()) {
      const positiveFlows = flows.filter(flow => flow.amount >= 0);
      const negativeFlows = flows.filter(flow => flow.amount < 0);

      const positiveFinancialFlows = this.createChartDataFromFinancialFlows(positiveFlows, true);
      const negativeFinancialFlows = this.createChartDataFromFinancialFlows(negativeFlows, false);

      financialFlowsDatas.push({
        turn,
        positiveFinancialFlows,
        negativeFinancialFlows,
      });
    }

    return financialFlowsDatas;
  }

  private createChartDataFromFinancialFlows(
    financialFlows: FinancialFlow[],
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
