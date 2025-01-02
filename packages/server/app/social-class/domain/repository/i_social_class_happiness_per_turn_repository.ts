import type SocialClassHappinessPerTurn from '#social-class/domain/models/social_class_happiness_per_turn';

export default abstract class ISocialClassHappinessPerTurnRepository {
  public abstract save(socialClassHappinessPerTurn: SocialClassHappinessPerTurn): Promise<void>;
  public abstract delete(socialClassHappinessPerTurn: SocialClassHappinessPerTurn): Promise<void>;
}
