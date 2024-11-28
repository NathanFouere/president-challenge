import type { PoliticalPartyMinimalDTO } from '@shared/types/political-party/political-party-minimal-d-t-o.js';
import type PoliticalParty from '#political-party/domain/models/political_party';

export class PoliticalPartyMinimalDTOFactory {
  public createPoliticalPartyMinimalDTO(politicalParty: PoliticalParty): PoliticalPartyMinimalDTO {
    return {
      id: politicalParty.id,
      name: politicalParty.name,
      affiliation: politicalParty.affiliation,
    };
  }

  public createPoliticalPartyMinimalDTOList(politicalParties: PoliticalParty[]): PoliticalPartyMinimalDTO[] {
    return politicalParties.map(this.createPoliticalPartyMinimalDTO);
  }
}
