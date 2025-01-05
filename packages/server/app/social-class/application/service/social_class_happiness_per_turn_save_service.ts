import { inject } from '@adonisjs/core';
import type SocialClass from '#social-class/domain/models/social_class';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ISocialClassHappinessPerTurnRepository
  from '#social-class/domain/repository/i_social_class_happiness_per_turn_repository';
import { aSocialClassHappinessPerTurn } from '#social-class/application/builders/social_class_happiness_per_turn_builder';

@inject()
export class SocialClassHappinessPerTurnSaveService {
  constructor(
    private readonly socialClassHappinessPerTurnRepository: ISocialClassHappinessPerTurnRepository,
  ) {
  }

  public async saveSocialClassesHappinessForTurn(socialClasses: SocialClass[], turn: number): Promise<void> {
    const promises = socialClasses.map(socialClass => this.saveSocialClassHappinessForTurn(socialClass, turn));
    await Promise.all(promises);
  }

  public async saveSocialClassHappinessForTurn(socialClass: SocialClass, turn: number): Promise<void> {
    const socialClassHappinessPerTurn = aSocialClassHappinessPerTurn()
      .withSocialClassId(socialClass.id)
      .withAmount(socialClass.getHappinessLevel())
      .withTurn(turn)
      .build();

    await this.socialClassHappinessPerTurnRepository.save(socialClassHappinessPerTurn);
  }
}
