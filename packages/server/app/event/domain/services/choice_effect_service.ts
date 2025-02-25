import { inject } from '@adonisjs/core';

import type Choice from '#event/domain/models/choice';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { SocialClassChoiceEffectService } from '#event/domain/services/social_class_choice_effect_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PoliticalPartyChoiceEffectService } from '#event/domain/services/political_party_choice_effect_service';

@inject()
export class ChoiceEffectService {
  constructor(
    private readonly socialClassChoiceEffectService: SocialClassChoiceEffectService,
    private readonly politicalPartyChoiceEffectService: PoliticalPartyChoiceEffectService,
  ) {
  }

  public async applyChoiceEffect(choice: Choice): Promise<void> {
    await Promise.all([
      this.socialClassChoiceEffectService.applyChoiceEffect(choice),
      this.politicalPartyChoiceEffectService.applyChoiceEffect(choice),
    ]);
  }
}
