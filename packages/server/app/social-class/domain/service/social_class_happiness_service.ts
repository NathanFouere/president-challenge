import { HappinessModifierType } from '@shared/dist/common/happiness-modifier-type.js';
import type SocialClass from '#social-class/domain/models/social_class';
import {
  aSocialClassHappinessModifier,
} from '#social-class/application/builders/social_class_happiness_modifier_builder';
import type { SocialClassTurnContext } from '#game/application/service/turn-service/load_turn_data_context_service';

export default class SocialClassHappinessService {
  public updateSocialClassesHappiness(socialClassesTurnContexts: SocialClassTurnContext[]): void {
    for (const socialClassTurnContexts of socialClassesTurnContexts) {
      this.changeSocialClassHappinessLevelThroughtEconomicalSituationEvolution(socialClassTurnContexts.socialClass);
    }
  }

  private changeSocialClassHappinessLevelThroughtEconomicalSituationEvolution(socialClass: SocialClass): void {
    socialClass.happinessModifiers.push(
      aSocialClassHappinessModifier()
        .withName('Economical Situation Evolution')
        .withDescription('Economical Situation Evolution')
        .withColor('blue') // TODO => change this
        .withType(HappinessModifierType.TEMPORARY)
        .withDuration(1)
        .withAmount(1)
        .withSocialClassId(socialClass.id)
        .build(),
    );
  }
}
