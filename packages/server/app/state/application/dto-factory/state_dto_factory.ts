import { inject } from '@adonisjs/core';
import type { StateDto } from '@shared/dist/state/state-dto.js';
import type State from '#state/domain/model/state';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LicensedFileDTOFactory } from '#licensed-file/application/factory/licensed_file_dto_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ChartDataFactory from '#common/utils/chart_data_factory';

@inject()
export class StateDtoFactory {
  constructor(
    private readonly licensedFileDtoFactory: LicensedFileDTOFactory,
    private readonly chartDataFactory: ChartDataFactory,
  ) {
  }

  public createFromState(state: State): StateDto {
    return {
      name: state.name,
      description: state.description,
      economicalSituation: state.economicalSituation,
      flag: this.licensedFileDtoFactory.createFromLicensedFile(state.flag),
      economicalSituationPerMonthChartData: this.chartDataFactory.createFromAmountPerTurn(
        state.economicalSituationPerTurn,
        'Economical Situation',
        0,
        4,
        [
          { min: 0, max: 0, value: 'Very-Low' },
          { min: 1, max: 1, value: 'Low' },
          { min: 2, max: 2, value: 'Medium' },
          { min: 3, max: 3, value: 'High' },
          { min: 4, max: 4, value: 'Very-High' },
        ],
      ),
    };
  }
}
