import { getDateFromTurnNumber } from '@president-challenge/shared/dist/utils/date-converter.js';
import { inject } from '@adonisjs/core';
import type { YLabels } from '@president-challenge/shared/dist/chart/YLabels.js';
import type { LineChartDataDTO } from '@president-challenge/shared/dist/chart/LineChartDataDTO.js';
import type { SaveAmountForTurn } from '#common/model/save_amount_for_turn';
import type { Range } from '#common/utils/range';

@inject()
export default class ChartDataFactory {
  public createLineCartFromSaveAmountPerTurn(
    saveAmountsForTurn: SaveAmountForTurn[],
    title: string,
    minY: number | null = null,
    maxY: number | null = null,
    ranges: Range[] | null = null,
  ): LineChartDataDTO {
    const labels: string[] = [];
    const backgroundColor: string[] = [];
    const borderColor: string[] = [];
    const data: number[] = [];

    for (const saveAmountForTurn of saveAmountsForTurn) {
      data.push(saveAmountForTurn.amount);
      backgroundColor.push(saveAmountForTurn.color);
      borderColor.push(saveAmountForTurn.color);
      labels.push(getDateFromTurnNumber(saveAmountForTurn.turn));
    }

    return {
      title: title,
      labels,
      yLabels: ranges ? this.toYLabels(ranges) : null,
      datasets: [
        {
          label: title,
          data,
          backgroundColor,
          borderColor,
        },
      ],
      minY,
      maxY,
    };
  }

  private toYLabels(ranges: Range[]): YLabels {
    const yLabels: Record<number, string> = {};
    for (const range of ranges) {
      for (let i = range.min; i <= range.max; i++) {
        yLabels[i] = range.value;
      }
    }
    return yLabels;
  }
}
