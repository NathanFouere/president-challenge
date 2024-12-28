import type SocialClassEconomicalSituationPerTurn
  from '#social-class/domain/models/social_class_economical_situation_per_turn';

export class SocialClassEconomicalSituationPerTurnRepository {
  public async save(socialClassEconomicalSituationPerTurn: SocialClassEconomicalSituationPerTurn): Promise<void> {
    await socialClassEconomicalSituationPerTurn.save();
  }

  public async delete(socialClassEconomicalSituationPerTurn: SocialClassEconomicalSituationPerTurn): Promise<void> {
    await socialClassEconomicalSituationPerTurn.delete();
  }
}
