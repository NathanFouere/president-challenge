import type { PoliticalPartyDTO } from '@shared/types/political-party/political-party-dto.js';
import type PoliticalParty from '#political-party/domain/models/political_party';

export class PoliticalPartyDTOFactory {
  public createPoliticalPartyDTO(politicalParty: PoliticalParty): PoliticalPartyDTO {
    return {
      id: politicalParty.id,
      name: politicalParty.name,
      affiliation: politicalParty.affiliation,
      test: 'test',
    };
  }
}
