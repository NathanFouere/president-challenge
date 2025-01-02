import type { ChartDataDTO } from '@shared/dist/chart/ChartDataDTO.js';
import { getDateFromTurnNumber } from '@shared/dist/utils/date-converter.js';
import type { SaveAmountForTurn } from '#common/model/save_amount_for_turn';

export function createChartDataFromAmountPerTurn(saveAmountForTurn: SaveAmountForTurn[], title: string): ChartDataDTO {
  const labels: string[] = [];
  const backgroundColor: string[] = [];
  const borderColor: string[] = [];
  const data: number[] = [];

  for (const monthEconomicalSituation of saveAmountForTurn) {
    data.push(monthEconomicalSituation.amount);
    backgroundColor.push(monthEconomicalSituation.color);
    borderColor.push(monthEconomicalSituation.color);
    labels.push(getDateFromTurnNumber(monthEconomicalSituation.turn));
  }

  return {
    title: title,
    labels,
    datasets: [
      {
        label: title,
        data,
        backgroundColor,
        borderColor,
      },
    ],
  };
}
