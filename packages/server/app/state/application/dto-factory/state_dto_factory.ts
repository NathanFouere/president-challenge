import { inject } from '@adonisjs/core';
import type { StateDto } from '@shared/dist/state/state-dto.js';
import type State from '#state/domain/model/state';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LicensedFileDTOFactory } from '#licensed-file/application/factory/licensed_file_dto_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ChartDataFactory from '#common/utils/chart_data_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import RangeLevelMatch from '#common/utils/range_level_match';

@inject()
export class StateDtoFactory {
  constructor(
    private readonly licensedFileDtoFactory: LicensedFileDTOFactory,
    private readonly chartDataFactory: ChartDataFactory,
    private readonly rangeLevelMatch: RangeLevelMatch,
  ) {
  }

  readonly stateHappinessRangeLevels = [
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
      economicalSituation: this.rangeLevelMatch.createFromAmount(
        state.economicalSituation,
        this.stateHappinessRangeLevels,
      ),
      flag: this.licensedFileDtoFactory.createFromLicensedFile(state.flag),
      economicalSituationPerMonthChartData: this.chartDataFactory.createFromAmountPerTurn(
        state.economicalSituationPerTurn,
        'Economical Situation',
        0,
        20,
        this.stateHappinessRangeLevels,
      ),
    };
  }
}
