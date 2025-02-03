import type { MinimalLawDto } from '@shared/dist/legislature/minimal-law-dto.js';
import type Law from '#legislature/domain/models/law';

export default class MinimalLawDtoFactory {
  public createFromLaw(law: Law): MinimalLawDto {
    return {
      id: law.id,
      name: law.name,
      description: law.description,
      voted: law.voted,
      politicalWeightRequired: law.politicalWeightRequired,
    };
  }

  public createFromLaws(laws: Law[]): MinimalLawDto[] {
    return laws.map(law => this.createFromLaw(law));
  }
}
