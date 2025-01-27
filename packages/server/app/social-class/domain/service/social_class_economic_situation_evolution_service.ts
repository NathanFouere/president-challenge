import { SocialClassTypes } from '@shared/dist/social-class/social-class-types.js';
import sectorEconomicalSituationMatchConfig
  from '#game-config/sector/sector-economical-situation-match-config.json' assert {type: 'json'};
import type SocialClass from '#social-class/domain/models/social_class';

export default class SocialClassEconomicalSituationEvolutionService {
  public propagateEconomicalSituationToSocialClasses(socialClasses: SocialClass[]): void {
    socialClasses.forEach(socialClass => this.propagateSectorEconomicalSituationToSocialClass(socialClass));
  }

  private propagateSectorEconomicalSituationToSocialClass(socialClass: SocialClass) {
    let newEconomicalSituation;
    const sector = socialClass.sector;
    switch (socialClass.type) {
      case SocialClassTypes.CAPITALIST:
        newEconomicalSituation = sectorEconomicalSituationMatchConfig[sector.ownershipType][sector.economicalSituation].owner;
        break;
      case SocialClassTypes.PETIT_BOURGEOIS:
        newEconomicalSituation = sectorEconomicalSituationMatchConfig[sector.ownershipType][sector.economicalSituation].owner;
        break;
      case SocialClassTypes.PROLETARIAT:
        newEconomicalSituation = sectorEconomicalSituationMatchConfig[sector.ownershipType][sector.economicalSituation].worker;
        break;
    }

    socialClass.addEconomicalSituation(newEconomicalSituation);
  }
}
