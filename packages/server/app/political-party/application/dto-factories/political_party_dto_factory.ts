import type { PoliticalPartyDTO } from '@shared/dist/political-party/political-party-dto.js';
import { inject } from '@adonisjs/core';
import type PoliticalParty from '#political-party/domain/models/political_party';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LicensedFileDTOFactory } from '#licensed-file/application/factory/licensed_file_dto_factory';
import { createChartDataFromAmountPerTurn } from '#common/utils';

@inject()
export class PoliticalPartyDTOFactory {
  constructor(
    private readonly licensedFileDTOFactory: LicensedFileDTOFactory,
  ) {
  }

  public createPoliticalPartyDTO(politicalParty: PoliticalParty): PoliticalPartyDTO {
    return {
      id: politicalParty.id,
      name: politicalParty.name,
      affiliation: politicalParty.affiliation,
      licensedFile: this.licensedFileDTOFactory.createFromLicensedFile(politicalParty.licensedFile),
      description: politicalParty.description,
      happinessLevel: politicalParty.happinessLevel,
      happinessPerMonthChartData: createChartDataFromAmountPerTurn(politicalParty.happinessPerTurn, 'Happiness Level'),
    };
  }
}
