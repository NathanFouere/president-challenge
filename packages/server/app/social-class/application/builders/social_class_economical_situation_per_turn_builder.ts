import { SaveAmountForTurnBuilder } from '#common/builder/save_amount_for_turn_builder';
import SocialClassEconomicalSituationPerTurn
  from '#social-class/domain/models/social_class_economical_situation_per_turn';

export default class SocialClassEconomicalSituationPerTurnBuilder extends SaveAmountForTurnBuilder {
  private socialClassId: number | null = null;

  public withSocialClassId(socialClassId: number): this {
    this.socialClassId = socialClassId;
    return this;
  }

  public build(): SocialClassEconomicalSituationPerTurn {
    const socialClassEconomicalSituationPerTurn = new SocialClassEconomicalSituationPerTurn();

    if (this.amount) socialClassEconomicalSituationPerTurn.amount = this.amount;
    else throw new Error('Amount is required');
    if (this.turn) socialClassEconomicalSituationPerTurn.turn = this.turn;
    else throw new Error('Turn is required');
    if (this.socialClassId) socialClassEconomicalSituationPerTurn.socialClassId = this.socialClassId;
    else throw new Error('Social class id is required');

    return socialClassEconomicalSituationPerTurn;
  }
}

export function aSocialClassEconomicalSituationPerTurn(): SocialClassEconomicalSituationPerTurnBuilder {
  return new SocialClassEconomicalSituationPerTurnBuilder();
}
