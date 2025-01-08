import PoliticalPartySeatsSenate from '#legislature/domain/models/political_party_seats_senate';

export class PoliticalPartySeatsSenateBuilder {
  public numberOfSeats: number | null = null;
  public politicalPartyId: number | null = null;
  public senateId: number | null = null;

  public withNumberOfSeats(numberOfSeats: number): this {
    this.numberOfSeats = numberOfSeats;
    return this;
  }

  public withPoliticalPartyId(politicalPartyId: number): this {
    this.politicalPartyId = politicalPartyId;
    return this;
  }

  public withSenateId(senateId: number): this {
    this.senateId = senateId;
    return this;
  }

  public build(): PoliticalPartySeatsSenate {
    const politicalPartySeatsSenate = new PoliticalPartySeatsSenate();

    if (this.numberOfSeats !== null) {
      politicalPartySeatsSenate.numberOfSeats = this.numberOfSeats;
    }
    else {
      throw new Error('numberOfSeats is required');
    }

    if (this.politicalPartyId !== null) {
      politicalPartySeatsSenate.politicalPartyId = this.politicalPartyId;
    }
    else {
      throw new Error('politicalPartyId is required');
    }

    if (this.senateId !== null) {
      politicalPartySeatsSenate.senateId = this.senateId;
    }
    else {
      throw new Error('senateId is required');
    }
    return politicalPartySeatsSenate;
  }
}

export function aPoliticalPartySeatsSenate(): PoliticalPartySeatsSenateBuilder {
  return new PoliticalPartySeatsSenateBuilder();
}
