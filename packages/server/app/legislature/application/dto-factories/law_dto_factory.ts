import type { LawDto } from '@shared/dist/legislature/law-dto.js';
import type Law from '#legislature/domain/models/law';

export default class LawDtoFactory {
  public createFromLaw(property: Law): LawDto {
    return {
      name: property.name,
      description: property.description,
      voted: property.voted,
      order: property.order,
    };
  }
}
