import { SaveAmountForTurnBuilder } from '#common/builder/save_amount_for_turn_builder';
import PoliticalPartyHappinessPerTurn from '#political-party/domain/models/political_party_happiness_per_turn';

export class PoliticalPartyHappinessPerTurnBuild extends SaveAmountForTurnBuilder {
  private politicalPartyId: number | null = null;

  public withPoliticalPartyId(politicalPartyId: number): this {
    this.politicalPartyId = politicalPartyId;
    return this;
  }

  public build(): PoliticalPartyHappinessPerTurn {
    const politicalPartyHappinessPerTurn = new PoliticalPartyHappinessPerTurn();

    if (this.amount != null) politicalPartyHappinessPerTurn.amount = this.amount;
    else throw new Error('Amount is required');
    if (this.turn) politicalPartyHappinessPerTurn.turn = this.turn;
    else throw new Error('Turn is required');
    if (this.politicalPartyId) politicalPartyHappinessPerTurn.politicalPartyId = this.politicalPartyId;
    else throw new Error('Political party id is required');

    return politicalPartyHappinessPerTurn;
  }
}

export function aPoliticalPartyHappinessPerTurn(): PoliticalPartyHappinessPerTurnBuild {
  return new PoliticalPartyHappinessPerTurnBuild();
}
