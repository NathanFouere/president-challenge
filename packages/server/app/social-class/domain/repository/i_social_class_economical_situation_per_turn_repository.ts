import type SocialClassEconomicalSituationPerTurn
  from '#social-class/domain/models/social_class_economical_situation_per_turn';

export default abstract class ISocialClassEconomicalSituationPerTurnRepository {
  public abstract save(socialClassEconomicalSituationPerTurn: SocialClassEconomicalSituationPerTurn): Promise<void>;
  public abstract delete(socialClassEconomicalSituationPerTurn: SocialClassEconomicalSituationPerTurn): Promise<void>;
}
