import { inject } from '@adonisjs/core';
import type { StateDto } from '@shared/dist/state/state-dto.js';
import type State from '#state/domain/model/state';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LicensedFileDTOFactory } from '#licensed-file/application/factory/licensed_file_dto_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ChartDataFactory from '#common/utils/chart_data_factory';
import { stateHappinessRangeLevels } from '#state/domain/range-levels/state_happiness_range_levels';
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

  public createFromState(state: State): StateDto {
    return {
      name: state.name,
      description: state.description,
      economicalSituation: this.rangeLevelMatch.createFromAmountPerTurn(
        state.economicalSituation,
        stateHappinessRangeLevels,
      ),
      flag: this.licensedFileDtoFactory.createFromLicensedFile(state.flag),
      economicalSituationPerMonthChartData: this.chartDataFactory.createFromAmountPerTurn(
        state.economicalSituationPerTurn,
        'Economical Situation',
        0,
        20,
        stateHappinessRangeLevels,
      ),
    };
  }
}
