import type SocialClassHappinessPerTurn from '#social-class/domain/models/social_class_happiness_per_turn';
import type ISocialClassHappinessPerTurnRepository
  from '#social-class/domain/repository/i_social_class_happiness_per_turn_repository';

export default class SocialClassHappinessPerTurnRepository implements ISocialClassHappinessPerTurnRepository {
  public async save(socialClassHappinessPerTurn: SocialClassHappinessPerTurn): Promise<void> {
    await socialClassHappinessPerTurn.save();
  }

  public async delete(socialClassHappinessPerTurn: SocialClassHappinessPerTurn): Promise<void> {
    await socialClassHappinessPerTurn.delete();
  }
}
