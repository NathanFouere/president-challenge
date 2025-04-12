import { inject } from '@adonisjs/core';
import { HappinessModifierType } from '@president-challenge/shared/dist/common/happiness-modifier-type.js';
import { SocialClassTypes } from '@president-challenge/shared/dist/social-class/social-class-types.js';
import type PoliticalParty from '#political-party/domain/models/political_party';
import type { SocialClassesPerType } from '#game/application/service/turn-service/load_turn_data_context_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SocialClassesAverageHappinessCalculatorService
  from '#social-class/domain/service/social_classes_average_happiness_calculator_service';
import {
  aPoliticalPartyHappinessModifier,
} from '#political-party/application/builders/political_party_happiness_modifier_builder';
import politicalPartySocialClassHappiness from '#game-config/political-party/political-party-social-class-happiness.json' assert { type: 'json' };
import type SocialClass from '#social-class/domain/models/social_class';

@inject()
export default class PoliticalPartyHappinessService {
  constructor(
    private readonly socialClassesAverageHappinessCalculatorService: SocialClassesAverageHappinessCalculatorService,
  ) {
  }

  public updatePoliticalPartiesHappiness(politicalParties: PoliticalParty[], socialClassesPerType: SocialClassesPerType): void {
    for (const politicalParty of politicalParties) {
      this.changePoliticalPartiesHappinessThroughtSocialClassesHappiness(politicalParty, socialClassesPerType);
    }
  }

  private changePoliticalPartiesHappinessThroughtSocialClassesHappiness(politicalParty: PoliticalParty, socialClassesPerType: SocialClassesPerType): void {
    this.fromSocialClassType(politicalParty, socialClassesPerType.businessOwner, SocialClassTypes.BUSINESS_OWNER);
    this.fromSocialClassType(politicalParty, socialClassesPerType.workingClass, SocialClassTypes.MIDDLE_CLASS);
    this.fromSocialClassType(politicalParty, socialClassesPerType.middleClass, SocialClassTypes.WORKING_CLASS);
  }

  private fromSocialClassType(politicalParty: PoliticalParty, socialClasses: SocialClass[], socialClassType: SocialClassTypes) {
    const socialClassAverageHappiness = this.socialClassesAverageHappinessCalculatorService.calculateAverageHappiness(socialClasses);
    const politicalPartyModifierRatioForSocialClass = politicalPartySocialClassHappiness[politicalParty.definition.affiliation][socialClassType];
    const processedAmount = socialClassAverageHappiness * politicalPartyModifierRatioForSocialClass;
    // TODO => moove to a factory
    const happinessModifier = aPoliticalPartyHappinessModifier()
      .withPoliticalPartyId(politicalParty.id)
      .withType(HappinessModifierType.TEMPORARY)
      .withDuration(1)
      .withName('Happiness Of ' + socialClassType)
      .withDescription('Happiness Of ' + socialClassType)
      .withColor('blue')
      .withAmount(processedAmount)
      .build();
    politicalParty.happinessModifiers.push(happinessModifier);
  }
}
