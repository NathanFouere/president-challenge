import type { PoliticalPartyMinimalDto } from '@shared/dist/political-party/political-party-minimal-dto.js';
import type PoliticalParty from '#political-party/domain/models/political_party';

export class PoliticalPartyMinimalDTOFactory {
  readonly AffiliationOrder = {
    'Far Left': 0,
    'Left': 1,
    'Center Left': 2,
    'Center Right': 3,
    'Right': 4,
    'Far Right': 5,
  };

  public createPoliticalPartyMinimalDTO(politicalParty: PoliticalParty): PoliticalPartyMinimalDto {
    return {
      id: politicalParty.id,
      name: politicalParty.definition.name,
      affiliation: politicalParty.definition.affiliation,
      licensedFile: politicalParty.definition.licensedFile,
      inPower: politicalParty.inPower,
    };
  }

  public createPoliticalPartyMinimalDTOList(politicalParties: PoliticalParty[]): PoliticalPartyMinimalDto[] {
    politicalParties.sort((a, b) => this.AffiliationOrder[a.definition.affiliation] - this.AffiliationOrder[b.definition.affiliation]);
    return politicalParties.map(this.createPoliticalPartyMinimalDTO);
  }
}
