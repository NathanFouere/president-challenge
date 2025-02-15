import type { PoliticalPartyDTO } from '@shared/dist/political-party/political-party-dto.js';
import { inject } from '@adonisjs/core';
import type PoliticalParty from '#political-party/domain/models/political_party';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LicensedFileDTOFactory } from '#licensed-file/application/factory/licensed_file_dto_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ChartDataFactory from '#common/utils/chart_data_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import HappinessDtoFactory from '#happiness-modifier/application/dto-factory/happiness_dto_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import RangeLevelMatch from '#common/utils/range_level_match';

@inject()
export class PoliticalPartyDTOFactory {
  constructor(
    private readonly licensedFileDTOFactory: LicensedFileDTOFactory,
    private readonly chartDataFactory: ChartDataFactory,
    private readonly rangeLevelMatch: RangeLevelMatch,
    private readonly happinessModifierDtoFactory: HappinessDtoFactory,
  ) {
  }

  readonly politicalPartyHappinessRangeLevels = [
    { min: 0, max: 1, value: 'Very-Low' },
    { min: 1, max: 2, value: 'Low' },
    { min: 2, max: 3, value: 'Medium' },
    { min: 3, max: 4, value: 'High' },
    { min: 4, max: 5, value: 'Very-High' },
  ];

  public createPoliticalPartyDTO(politicalParty: PoliticalParty): PoliticalPartyDTO {
    return {
      id: politicalParty.id,
      name: politicalParty.definition.name,
      affiliation: politicalParty.definition.affiliation,
      licensedFile: this.licensedFileDTOFactory.createFromLicensedFile(politicalParty.definition.licensedFile),
      description: politicalParty.definition.description,
      happinessLevel: this.rangeLevelMatch.createFromAmount(politicalParty.getHappinessLevel(), this.politicalPartyHappinessRangeLevels),
      happinessPerMonthChartData: this.chartDataFactory.createLineCartFromSaveAmountPerTurn(
        politicalParty.happinessPerTurn,
        'Happiness Level',
        0,
        4,
        this.politicalPartyHappinessRangeLevels,
      ),
      happinessModifiers: this.happinessModifierDtoFactory.createFromHappinesssModifiers(politicalParty.happinessModifiers),
    };
  }
}
