import type { PoliticalPartyMinimalDto } from '@shared/types/political-party/political-party-minimal-dto.js';
import type PoliticalParty from '#political-party/domain/models/political_party';

export class PoliticalPartyMinimalDTOFactory {
  public createPoliticalPartyMinimalDTO(politicalParty: PoliticalParty): PoliticalPartyMinimalDto {
    return {
      id: politicalParty.id,
      name: politicalParty.name,
      affiliation: politicalParty.affiliation,
      licensedFile: politicalParty.licensedFile,
    };
  }

  public createPoliticalPartyMinimalDTOList(politicalParties: PoliticalParty[]): PoliticalPartyMinimalDto[] {
    return politicalParties.map(this.createPoliticalPartyMinimalDTO);
  }
}
