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
      const positiveFlows = [];
      const negativeFlows = [];
      for (const flow of flows) {
        if (flow.amount >= 0) {
          positiveFlows.push(flow);
        }
        else {
          negativeFlows.push(flow);
        }
      }

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
    const labels = [];
    const data = [];
    const backgroundColor = [];
    const borderColor = [];
    for (const financialFlow of financialFlows) {
      labels.push(financialFlow.name);
      data.push(financialFlow.amount);
      backgroundColor.push(financialFlow.color);
      borderColor.push(financialFlow.color);
    }

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
