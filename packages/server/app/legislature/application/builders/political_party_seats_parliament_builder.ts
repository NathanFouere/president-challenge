import PoliticalPartySeatsParliament from '#legislature/domain/models/political_party_seats_parliament';

export class PoliticalPartySeatsParliamentBuilder {
  private numberOfSeats: number | null = null;
  private politicalPartyId: number | null = null;
  private parliamentId: number | null = null;
  private definitionId: number | null = null;

  public withDefinitionId(definitionId: number): this {
    this.definitionId = definitionId;
    return this;
  }

  public withNumberOfSeats(numberOfSeats: number): this {
    this.numberOfSeats = numberOfSeats;
    return this;
  }

  public withPoliticalPartyId(politicalPartyId: number): this {
    this.politicalPartyId = politicalPartyId;
    return this;
  }

  public withParliamentId(parliamentId: number): this {
    this.parliamentId = parliamentId;
    return this;
  }

  public build(): PoliticalPartySeatsParliament {
    const politicalPartySeatsParliament = new PoliticalPartySeatsParliament();

    if (this.numberOfSeats !== null) {
      politicalPartySeatsParliament.numberOfSeats = this.numberOfSeats;
    }
    else {
      throw new Error('numberOfSeats is required');
    }

    if (this.politicalPartyId !== null) {
      politicalPartySeatsParliament.politicalPartyId = this.politicalPartyId;
    }
    else {
      throw new Error('politicalPartyId is required');
    }

    if (this.parliamentId !== null) {
      politicalPartySeatsParliament.parliamentId = this.parliamentId;
    }
    else {
      throw new Error('parliamentId is required');
    }
    if (this.definitionId !== null) {
      politicalPartySeatsParliament.definitionId = this.definitionId;
    }
    else {
      throw new Error('definitionId is required');
    }
    return politicalPartySeatsParliament;
  }
}

export function aPoliticalPartySeatsParliament(): PoliticalPartySeatsParliamentBuilder {
  return new PoliticalPartySeatsParliamentBuilder();
}
