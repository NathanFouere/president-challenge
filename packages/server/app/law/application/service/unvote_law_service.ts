import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import RemoveSocialClassHappinessEffectFromLawService
  from '#law/application/service/law-effect/remove_social_class_happiness_effect_from_law_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import RemovePoliticalHappinessEffectFromLawService
  from '#law/application/service/law-effect/remove_political_happiness_effect_from_law_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ILawRepository from '#law/domain/repository/i_law_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetIncompatibleLawsQueryHandler from '#law/application/query/i_get_incompatible_laws_query_handler';
import GetIncompatibleLawsQuery from '#law/application/query/get_incompatible_laws_query';
import type Law from '#law/domain/model/law';

@inject()
export default class UnvoteLawService {
  constructor(
    private readonly lawRepository: ILawRepository,
    private readonly removeSocialClassHappinessEffectFromLawService: RemoveSocialClassHappinessEffectFromLawService,
    private readonly removePoliticalPartiesHappinessEffectFromLawService: RemovePoliticalHappinessEffectFromLawService,
    private readonly getIncompatibleLawsQueryHandler: IGetIncompatibleLawsQueryHandler,
  ) {
  }

  public async unvoteIncompatibleLawsOfLaw(law: Law, gameId: number): Promise<void> {
    const laws = await this.getIncompatibleLawsQueryHandler.handle(new GetIncompatibleLawsQuery(
      law,
      gameId,
    ));
    const unvotePromises = [];
    for (const law of laws) {
      unvotePromises.push(this.unvoteLawVote(law));
    }
    await Promise.all(unvotePromises);
  }

  private async unvoteLawVote(law: Law): Promise<void> {
    law.setUnvoted();
    await this.removeSocialClassHappinessEffectFromLawService.removeSocialClassesHappinessEffectOfLaw(law, law.gameId);
    await this.removePoliticalPartiesHappinessEffectFromLawService.removePoliticalPartiesHappinessEffectOfLaw(law, law.gameId);
    await this.lawRepository.save(law);
  }
}
