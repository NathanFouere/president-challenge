import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import PoliticalPartyHappinessModifierFactory
  from '#political-party/application/factory/political_party_happiness_modifier_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  IGetPoliticalPartyPerAffiliationInGameQueryHandler,
} from '#political-party/application/queries/i_get_political_party_per_affiliation_in_game_query_handler';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IPoliticalPartyHappinessModifierRepository
  from '#political-party/domain/repository/i_political_party_happiness_modifier_repository';
import type PoliticalAffiliationLawHappinessEffect
  from '#political-party/domain/models/political_affiliation_law_happiness_effect';
import GetPoliticalPartyPerAffiliationInGameQuery
  from '#political-party/application/queries/get_political_party_per_affiliation_in_game_query';
import type Law from '#law/domain/model/law';

@inject()
export default class ApplyPoliticalPartiesHappinessLawEffectService {
  constructor(
    private readonly politicalPartyHappinessModifierFactory: PoliticalPartyHappinessModifierFactory,
    private readonly iGetPoliticalPartyPerAffiliationInGameQueryHandler: IGetPoliticalPartyPerAffiliationInGameQueryHandler,
    private readonly politicalPartyHappinessModifierRepository: IPoliticalPartyHappinessModifierRepository,
  ) {
  }

  public async applyPoliticalPartiesHappinessEffects(law: Law, gameId: number): Promise<void> {
    const happinessModifierCreationPromises = [];
    for (const politicalAffiliationLawHappinessEffect of law.definition.politicalPartiesAffiliationHappinessEffects) {
      happinessModifierCreationPromises.push(this.applyPoliticalPartyHappinessEffect(law, politicalAffiliationLawHappinessEffect, gameId));
    }
    await Promise.all(happinessModifierCreationPromises);
  }

  private async applyPoliticalPartyHappinessEffect(law: Law, politicalAffiliationLawHappinessEffect: PoliticalAffiliationLawHappinessEffect, gameId: number): Promise<void> {
    const politicalParty = await this.iGetPoliticalPartyPerAffiliationInGameQueryHandler.handle(new GetPoliticalPartyPerAffiliationInGameQuery(
      gameId,
      politicalAffiliationLawHappinessEffect.politicalAffiliation,
    ));
    const happinessModifier = this.politicalPartyHappinessModifierFactory.createFromLaw(law, politicalAffiliationLawHappinessEffect, politicalParty);
    await this.politicalPartyHappinessModifierRepository.save(happinessModifier);
  }
}
