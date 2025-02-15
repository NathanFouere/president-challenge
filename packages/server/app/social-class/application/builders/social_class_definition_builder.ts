import type { SocialClassTypes } from '@shared/dist/social-class/social-class-types.js';
import type { SocialClassSubtypes } from '@shared/dist/social-class/social-class-subtypes.js';
import type { SectorTypes } from '@shared/dist/sector/sector-types.js';
import SocialClassDefinition from '#social-class/domain/models/social_class_definition';

export class SocialClassDefinitionBuilder {
  private name: string | null = null;
  private description: string | null = null;
  private color: string | null = null;
  private defaultEconomicalSituation: number | null = null;
  private subtype: SocialClassSubtypes | null = null;
  private type: SocialClassTypes | null = null;
  private sectorType: SectorTypes | null = null;

  withName(name: string): this {
    this.name = name;
    return this;
  }

  withDescription(description: string): this {
    this.description = description;
    return this;
  }

  withColor(color: string): this {
    this.color = color;
    return this;
  }

  withDefaultEconomicalSituation(defaultEconomicalSituation: number): this {
    this.defaultEconomicalSituation = defaultEconomicalSituation;
    return this;
  }

  withType(socialClassType: SocialClassTypes): this {
    this.type = socialClassType;
    return this;
  }

  withSubtype(socialClassSubtypes: SocialClassSubtypes): this {
    this.subtype = socialClassSubtypes;
    return this;
  }

  withSectorType(sectorType: SectorTypes): this {
    this.sectorType = sectorType;
    return this;
  }

  build(): SocialClassDefinition {
    const socialClass = new SocialClassDefinition();
    if (this.name) socialClass.name = this.name;
    else throw new Error('Name is required');
    if (this.description) socialClass.description = this.description;
    else throw new Error('Description is required');
    if (this.color) socialClass.color = this.color;
    else throw new Error('Color is required');
    if (!this.defaultEconomicalSituation) throw new Error('economical Situation is required');
    else socialClass.defaultEconomicalSituation = this.defaultEconomicalSituation;
    if (this.subtype) socialClass.subType = this.subtype;
    else throw new Error('Social class type is required');
    if (this.sectorType) socialClass.sectorType = this.sectorType;
    else throw new Error('Sector ID is required');
    if (this.type) socialClass.type = this.type;
    else throw new Error('Type is required');
    return socialClass;
  }
}

export function aSocialClassDefinition(): SocialClassDefinitionBuilder {
  return new SocialClassDefinitionBuilder();
}
