import type SocialClassEconomicalSituationPerTurn
  from '#social-class/domain/models/social_class_economical_situation_per_turn';
import type ISocialClassEconomicalSituationPerTurnRepository
  from '#social-class/domain/repository/i_social_class_economical_situation_per_turn_repository';

export default class SocialClassEconomicalSituationPerTurnRepository implements ISocialClassEconomicalSituationPerTurnRepository {
  public async save(socialClassEconomicalSituationPerTurn: SocialClassEconomicalSituationPerTurn): Promise<void> {
    await socialClassEconomicalSituationPerTurn.save();
  }

  public async delete(socialClassEconomicalSituationPerTurn: SocialClassEconomicalSituationPerTurn): Promise<void> {
    await socialClassEconomicalSituationPerTurn.delete();
  }
}
