import type { PoliticalAffiliation } from '@shared/types/political-party/political-affiliation.js';
import PoliticalParty from '#political-party/domain/models/political_party';

export class PoliticalPartyBuilder {
  public id: number | null = null;
  public name: string | null = null;
  public affiliation: PoliticalAffiliation | null = null;
  public description: string | null = null;
  public color: string | null = null;
  public gameId: number | null = null;
  public licensedFileIdentifier: string | null = null;

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

  public withGameId(gameId: number): this {
    this.gameId = gameId;
    return this;
  }

  public withLicensedFileIdentifier(licensedFileIdentifier: string): this {
    this.licensedFileIdentifier = licensedFileIdentifier;
    return this;
  }

  public build(): PoliticalParty {
    const politicalParty = new PoliticalParty();

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

    if (this.gameId !== null) {
      politicalParty.gameId = this.gameId;
    }
    else {
      throw new Error('game is required');
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

export function aPoliticalParty(): PoliticalPartyBuilder {
  return new PoliticalPartyBuilder();
}
