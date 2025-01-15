import type { MinimalLawDto } from '@shared/dist/legislature/minimal-law-dto.js';
import type Law from '#legislature/domain/models/law';

export default class MinimalLawDtoFactory {
  public createFromLaw(property: Law): MinimalLawDto {
    return {
      id: property.id,
      name: property.name,
      description: property.description,
      voted: property.voted,
    };
  }

  public createFromLaws(properties: Law[]): MinimalLawDto[] {
    return properties.map(property => this.createFromLaw(property));
  }
}
