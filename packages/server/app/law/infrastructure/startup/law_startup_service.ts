import { inject } from '@adonisjs/core';
import type { StartupProcessorStep } from '#common/startup/startup_processor_step';

import { aLaw } from '#law/application/builder/game_law_builder';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ILawDefinitionRepository from '#law/domain/repository/i_law_definition_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SocialClassHappinessLawEffectService
  from '#law/application/service/law-effect/social_class_happiness_law_effect_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ApplyPoliticalPartiesHappinessLawEffectService
  from '#law/application/service/law-effect/apply_political_parties_happiness_law_effect_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { IGetLawByGameQueryHandler } from '#law/application/query/i_get_law_by_game_query_handler';
import GetLawByGameQuery from '#law/application/query/get_law_by_game_and_type_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ILawRepository from '#law/domain/repository/i_law_repository';

@inject()
export default class LawStartupService implements StartupProcessorStep {
  constructor(
    private readonly lawDefinitionRepository: ILawDefinitionRepository,
    private readonly applySocialClassesHappinessEffects: SocialClassHappinessLawEffectService,
    private readonly applyPoliticalPartiesHappinessEffects: ApplyPoliticalPartiesHappinessLawEffectService,
    private readonly getLawByGameQueryHandler: IGetLawByGameQueryHandler,
    private readonly lawRepository: ILawRepository,
  ) {
  }

  public async execute(gameId: number): Promise<void> {
    const lawDefinitions = await this.lawDefinitionRepository.getAll();
    const laws = [];
    for (const lawDefinition of lawDefinitions) {
      const law
      = aLaw()
        .withGameId(gameId)
        .withLawDefinitionId(lawDefinition.id)
        .withVoted(lawDefinition.votedByDefault)
        .build();
      laws.push(law);
    }
    await this.lawRepository.saveMany(laws);

    for (const law of laws) {
      if (law.isVoted()) {
        const fullyLoadedLaw = await this.getLawByGameQueryHandler.handleForVote(new GetLawByGameQuery(law.id, gameId));
        await Promise.all([
          this.applySocialClassesHappinessEffects.applySocialClassesHappinessEffects(fullyLoadedLaw, gameId),
          this.applyPoliticalPartiesHappinessEffects.applyPoliticalPartiesHappinessEffects(fullyLoadedLaw, gameId),
        ]);
      }
    }
  }
}
