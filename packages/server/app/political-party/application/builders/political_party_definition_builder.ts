import type { PoliticalAffiliation } from '@shared/dist/political-party/political-affiliation.js';
import PoliticalPartyDefinition from '#political-party/domain/models/political_party_definition';

export class PoliticalPartyDefinitionBuilder {
  private name: string | null = null;
  private affiliation: PoliticalAffiliation | null = null;
  private description: string | null = null;
  private color: string | null = null;
  private licensedFileIdentifier: string | null = null;

  public withName(name: string): this {
    this.name = name;
    return this;
  }

  public withAffiliation(affiliation: PoliticalAffiliation): this {
    this.affiliation = affiliation;
    return this;
  }

  public withDescription(description: string): this {
    this.description = description;
    return this;
  }

  public withColor(color: string): this {
    this.color = color;
    return this;
  }

  public withLicensedFileIdentifier(licensedFileIdentifier: string): this {
    this.licensedFileIdentifier = licensedFileIdentifier;
    return this;
  }

  public build(): PoliticalPartyDefinition {
    const politicalParty = new PoliticalPartyDefinition();

    if (this.name !== null) {
      politicalParty.name = this.name;
    }
    else {
      throw new Error('name is required');
    }

    if (this.affiliation !== null) {
      politicalParty.affiliation = this.affiliation;
    }
    else {
      throw new Error('affiliation is required');
    }

    if (this.description !== null) {
      politicalParty.description = this.description;
    }
    else {
      throw new Error('description is required');
    }

    if (this.color !== null) {
      politicalParty.color = this.color;
    }
    else {
      throw new Error('color is required');
    }

    if (this.licensedFileIdentifier !== null) {
      politicalParty.licensedFileIdentifier = this.licensedFileIdentifier;
    }
    else {
      throw new Error('licensedFileIdentifier is required');
    }

    return politicalParty;
  }
}

export function aPoliticalPartyDefinition(): PoliticalPartyDefinitionBuilder {
  return new PoliticalPartyDefinitionBuilder();
}
