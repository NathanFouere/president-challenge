import { inject } from '@adonisjs/core';
import type { StateDto } from '@shared/dist/state/state-dto.js';
import type { ChartDataDTO } from '@shared/dist/chart/ChartDataDTO.js';
import { getDateFromTurnNumber } from '@shared/dist/utils/date-converter.js';
import type State from '#state/domain/model/state';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LicensedFileDTOFactory } from '#licensed-file/application/factory/licensed_file_dto_factory';

@inject()
export class StateDtoFactory {
  constructor(
    private readonly licensedFileDtoFactory: LicensedFileDTOFactory,
  ) {
  }

  public createFromState(state: State): StateDto {
    return {
      name: state.name,
      description: state.description,
      economicalSituation: state.economicalSituation,
      flag: this.licensedFileDtoFactory.createFromLicensedFile(state.flag),
      economicalSituationPerMonthChartData: this.createEconomicalSituationChartData(state),
    };
  }

  private createEconomicalSituationChartData(state: State): ChartDataDTO {
    const labels: string[] = [];
    const backgroundColor: string[] = [];
    const borderColor: string[] = [];
    const data: number[] = [];

    for (const monthEconomicalSituation of state.economicalSituationPerTurn) {
      data.push(monthEconomicalSituation.amount);
      backgroundColor.push(monthEconomicalSituation.color);
      borderColor.push(monthEconomicalSituation.color);
      labels.push(getDateFromTurnNumber(monthEconomicalSituation.turn));
    }

    return {
      title: 'Economical Situation',
      labels,
      datasets: [
        {
          label: 'Economical Situation',
          data,
          backgroundColor,
          borderColor,
        },
      ],
    };
  }
}
