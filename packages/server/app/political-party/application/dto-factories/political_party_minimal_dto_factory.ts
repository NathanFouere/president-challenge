import type { PoliticalPartyMinimalDto } from '@president-challenge/shared/dist/political-party/political-party-minimal-dto.js';
import { inject } from '@adonisjs/core';
import type PoliticalParty from '#political-party/domain/models/political_party';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LicensedFileDTOFactory } from '#licensed-file/application/factory/licensed_file_dto_factory';

@inject()
export class PoliticalPartyMinimalDTOFactory {
  constructor(
    private readonly licensedFileDTOFactory: LicensedFileDTOFactory,
  ) {
  }

  readonly AffiliationOrder = {
    'Far Left': 0,
    'Left': 1,
    'Center Left': 2,
    'Center Right': 3,
    'Right': 4,
    'Far Right': 5,
  };

  public async createPoliticalPartyMinimalDTO(politicalParty: PoliticalParty): Promise<PoliticalPartyMinimalDto> {
    return {
      id: politicalParty.id,
      name: politicalParty.definition.name,
      affiliation: politicalParty.definition.affiliation,
      licensedFile: await this.licensedFileDTOFactory.createFromLicensedFile(politicalParty.definition.licensedFile),
      inPower: politicalParty.inPower,
    };
  }

  public async createPoliticalPartyMinimalDTOList(politicalParties: PoliticalParty[]): Promise<PoliticalPartyMinimalDto[]> {
    politicalParties.sort((a, b) => this.AffiliationOrder[a.definition.affiliation] - this.AffiliationOrder[b.definition.affiliation]);
    return Promise.all(politicalParties.map(async politicalParty => this.createPoliticalPartyMinimalDTO(politicalParty)));
  }
}
