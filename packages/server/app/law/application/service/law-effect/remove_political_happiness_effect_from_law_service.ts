import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  IGetPoliticalPartyPerAffiliationInGameQueryHandler,
} from '#political-party/application/queries/i_get_political_party_per_affiliation_in_game_query_handler';
import GetPoliticalPartyPerAffiliationInGameQuery
  from '#political-party/application/queries/get_political_party_per_affiliation_in_game_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IPoliticalPartyHappinessModifierRepository
  from '#political-party/domain/repository/i_political_party_happiness_modifier_repository';
import type Law from '#law/domain/model/law';

@inject()
export default class RemovePoliticalHappinessEffectFromLawService {
  constructor(
    private readonly politicalPartyHappinessModifierRepository: IPoliticalPartyHappinessModifierRepository,
    private readonly iGetPoliticalPartyPerAffiliationInGameQueryHandler: IGetPoliticalPartyPerAffiliationInGameQueryHandler,
  ) {
  }

  public async removePoliticalPartiesHappinessEffectOfLaw(law: Law, gameId: number): Promise<void> {
    for (const politicalAffiliationLawHappinessEffect of law.definition.politicalPartiesAffiliationHappinessEffects) {
      const politicalParty = await this.iGetPoliticalPartyPerAffiliationInGameQueryHandler.handle(new GetPoliticalPartyPerAffiliationInGameQuery(
        gameId,
        politicalAffiliationLawHappinessEffect.politicalAffiliation,
      ));
      for (const happinessModifier of politicalParty.happinessModifiers) {
        if (happinessModifier.lawOriginId === law.id) {
          await this.politicalPartyHappinessModifierRepository.delete(happinessModifier);
        }
      }
    }
  }
}
