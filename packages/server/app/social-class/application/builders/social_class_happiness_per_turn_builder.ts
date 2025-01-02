import { SaveAmountForTurnBuilder } from '#common/builder/save_amount_for_turn_builder';
import SocialClassHappinessPerTurn from '#social-class/domain/models/social_class_happiness_per_turn';

export default class SocialClassHappinessPerTurnBuilder extends SaveAmountForTurnBuilder {
  private socialClassId: number | null = null;

  public withSocialClassId(socialClassId: number): this {
    this.socialClassId = socialClassId;
    return this;
  }

  public build(): SocialClassHappinessPerTurn {
    const socialClassHappinessPerTurn = new SocialClassHappinessPerTurn();

    if (this.amount != null) socialClassHappinessPerTurn.amount = this.amount;
    else throw new Error('Amount is required');
    if (this.turn) socialClassHappinessPerTurn.turn = this.turn;
    else throw new Error('Turn is required');
    if (this.socialClassId) socialClassHappinessPerTurn.socialClassId = this.socialClassId;
    else throw new Error('Social class id is required');

    return socialClassHappinessPerTurn;
  }
}

export function aSocialClassHappinessPerTurn(): SocialClassHappinessPerTurnBuilder {
  return new SocialClassHappinessPerTurnBuilder();
}
