import { inject } from '@adonisjs/core';
import {
  aSocialClassEconomicalSituationPerTurn,
} from '#social-class/application/builders/social_class_economical_situation_per_turn_builder';
import type SocialClass from '#social-class/domain/models/social_class';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ISocialClassEconomicalSituationPerTurnRepository
  from '#social-class/domain/repository/i_social_class_economical_situation_per_turn_repository';

@inject()
export class SocialClassEconomicalSituationPerTurnSaveService {
  constructor(
    private readonly socialClassEconomicalSituationPerTurnRepository: ISocialClassEconomicalSituationPerTurnRepository,
  ) {
  }

  public async saveSocialClassesEconomicalSituationForTurn(socialClasses: SocialClass[], turn: number): Promise<void> {
    const promises = socialClasses.map(socialClass => this.saveSocialClassEconomicalSituationForTurn(socialClass, turn));
    await Promise.all(promises);
  }

  public async saveSocialClassEconomicalSituationForTurn(socialClass: SocialClass, turn: number): Promise<void> {
    const socialClassEconomicalSituationForTurn = aSocialClassEconomicalSituationPerTurn()
      .withSocialClassId(socialClass.id)
      .withAmount(socialClass.economicalSituation)
      .withTurn(turn)
      .build();

    await this.socialClassEconomicalSituationPerTurnRepository.save(socialClassEconomicalSituationForTurn);
  }
}
