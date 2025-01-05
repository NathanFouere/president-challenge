import { SocialClassTypes } from '@shared/dist/social-class/social-class-types.js';
import { HappinessModifierType } from '@shared/dist/common/happiness-modifier-type.js';
import type Sector from '#sector/domain/model/sector';
import sectorEconomicalSituationMatchConfig
  from '#game-config/sector/sector-economical-situation-match-config.json' assert {type: 'json'};
import type SocialClass from '#social-class/domain/models/social_class';
import {
  aSocialClassHappinessModifier,
} from '#social-class/application/builders/social_class_happiness_modifier_builder';

export default class SocialClassEconomicalSituationEvolutionService {
  public propagateSectorEconomicalSituationToSocialClasses(sector: Sector): void {
    sector.socialClasses.forEach(socialClass => this.propagateSectorEconomicalSituationToSocialClass(sector, socialClass));
  }

  private propagateSectorEconomicalSituationToSocialClass(sector: Sector, socialClass: SocialClass) {
    const defaultSocialClassEconomicalSituation = socialClass.economicalSituation;
    let newEconomicalSituation = 0;
    switch (socialClass.type) {
      case SocialClassTypes.CAPITALIST:
        newEconomicalSituation = defaultSocialClassEconomicalSituation + sectorEconomicalSituationMatchConfig[sector.ownershipType][sector.economicalSituation].owner;
        break;
      case SocialClassTypes.PETIT_BOURGEOIS:
        newEconomicalSituation = defaultSocialClassEconomicalSituation + sectorEconomicalSituationMatchConfig[sector.ownershipType][sector.economicalSituation].owner;
        break;
      case SocialClassTypes.PROLETARIAT:
        newEconomicalSituation = defaultSocialClassEconomicalSituation + sectorEconomicalSituationMatchConfig[sector.ownershipType][sector.economicalSituation].worker;
        break;
    }
    if (newEconomicalSituation > 4) {
      newEconomicalSituation = 4;
    }
    else if (newEconomicalSituation < 0) {
      newEconomicalSituation = 0;
    }

    if (newEconomicalSituation !== defaultSocialClassEconomicalSituation) {
      this.changeHappinessLevelThroughtEconomicalSituationEvolution(socialClass, newEconomicalSituation);
      socialClass.economicalSituation = newEconomicalSituation;
    }
  }

  private changeHappinessLevelThroughtEconomicalSituationEvolution(socialClass: SocialClass, newEconomicalSituation: number): void {
    socialClass.happinessModifiers.push(
      aSocialClassHappinessModifier()
        .withName('Economical Situation Evolution')
        .withDescription('Economical Situation Evolution')
        .withColor('blue')
        .withType(HappinessModifierType.TEMPORARY)
        .withDuration(1)
        .withSocialClassId(socialClass.id)
        .build(),
    );
    if (newEconomicalSituation > socialClass.economicalSituation) {
      socialClass.increaseHappinessLevel();
    }
    else {
      socialClass.decreaseHappinessLevel();
    }
  }
}
