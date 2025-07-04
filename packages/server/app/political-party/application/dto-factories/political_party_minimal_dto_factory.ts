import type { PoliticalPartyMinimalDto } from '@president-challenge/shared/dist/political-party/political-party-minimal-dto.js';
import { inject } from '@adonisjs/core';
import type PoliticalParty from '#political-party/domain/models/political_party';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LicensedFileDTOFactory } from '#licensed-file/application/factory/licensed_file_dto_factory';
import { AffiliationOrder } from '#political-party/domain/models/political_party_affiliation_order';

@inject()
export class PoliticalPartyMinimalDTOFactory {
  constructor(
    private readonly licensedFileDTOFactory: LicensedFileDTOFactory,
  ) {
  }

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
    politicalParties.sort((a, b) => AffiliationOrder[a.definition.affiliation] - AffiliationOrder[b.definition.affiliation]);
    return Promise.all(politicalParties.map(async politicalParty => this.createPoliticalPartyMinimalDTO(politicalParty)));
  }
}
