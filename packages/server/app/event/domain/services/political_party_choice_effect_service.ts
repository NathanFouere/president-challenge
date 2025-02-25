import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import PoliticalPartyHappinessModifierFactory
  from '#political-party/application/factory/political_party_happiness_modifier_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IPoliticalPartyHappinessModifierRepository
  from '#political-party/domain/repository/i_political_party_happiness_modifier_repository';
import type Choice from '#event/domain/models/choice';
import type PoliticalAffiliationChoiceHappinessEffect
  from '#political-party/domain/models/political_affiliation_choice_happiness_effect';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  IGetPoliticalPartyPerAffiliationInGameQueryHandler,
} from '#political-party/application/queries/i_get_political_party_per_affiliation_in_game_query_handler';
import GetPoliticalPartyPerAffiliationInGameQuery
  from '#political-party/application/queries/get_political_party_per_affiliation_in_game_query';

@inject()
export class PoliticalPartyChoiceEffectService {
  constructor(
    private readonly politicalPartyHappinessModifierFactory: PoliticalPartyHappinessModifierFactory,
    private readonly getPoliticalPartyPerAffiliationInGameQueryHandler: IGetPoliticalPartyPerAffiliationInGameQueryHandler,
    private readonly politicalPartyHappinessModifierRepository: IPoliticalPartyHappinessModifierRepository,
  ) {
  }

  public async applyChoiceEffect(choice: Choice): Promise<void> {
    await Promise.all(choice.definition.politicalAffiliationHappinessEffects.map((politicalAffiliationChoiceHappinessEffect: PoliticalAffiliationChoiceHappinessEffect) => {
      this.applyPoliticalPartiesChoiceEffect(choice, politicalAffiliationChoiceHappinessEffect);
    }));
  }

  private async applyPoliticalPartiesChoiceEffect(choice: Choice, politicalAffiliationChoiceHappinessEffect: PoliticalAffiliationChoiceHappinessEffect): Promise<void> {
    const politicalParty = await this.getPoliticalPartyPerAffiliationInGameQueryHandler.handle(new GetPoliticalPartyPerAffiliationInGameQuery(
      choice.gameId,
      politicalAffiliationChoiceHappinessEffect.politicalAffiliation,
    ));

    const happinessModifier = this.politicalPartyHappinessModifierFactory.createFromChoice(choice.definition, politicalAffiliationChoiceHappinessEffect, politicalParty);
    await this.politicalPartyHappinessModifierRepository.save(happinessModifier);
  }
}
