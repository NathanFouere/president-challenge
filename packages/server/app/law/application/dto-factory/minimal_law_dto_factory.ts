import type { MinimalLawDto } from '@president-challenge/shared/dist/legislature/minimal-law-dto.js';
import type Law from '#law/domain/model/law';

export default class MinimalLawDtoFactory {
  public createFromLaw(law: Law): MinimalLawDto {
    return {
      id: law.id,
      name: law.definition.name,
      description: law.definition.description,
      voted: law.voted,
      politicalWeightRequired: law.definition.politicalWeightRequired,
    };
  }

  public createFromLaws(laws: Law[]): MinimalLawDto[] {
    return laws.map(law => this.createFromLaw(law));
  }
}
