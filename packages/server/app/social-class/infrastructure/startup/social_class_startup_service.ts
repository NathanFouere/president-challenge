import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ISocialClassRepository from '#social-class/domain/repository/i_social_class_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ISocialClassDefinitionRepository from '#social-class/domain/repository/i_social_class_definition_repository';
import { aSocialClass } from '#social-class/application/builders/social_class_builder';
import type { StartupProcessorStep } from '#common/startup/startup_processor_step';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetSectorByGameAndTypeQueryHandler from '#sector/application/query/i_get_sector_by_game_and_type_query_handler';
import { GetSectorByGameAndTypeQuery } from '#sector/application/query/get_sector_by_game_and_type_query';

@inject()
export class SocialClassStartupService implements StartupProcessorStep {
  constructor(
    private readonly socialClassRepository: ISocialClassRepository,
    private readonly socialClassDefinitionRepository: ISocialClassDefinitionRepository,
    private readonly getSectorByGameAndTypeQueryHandler: IGetSectorByGameAndTypeQueryHandler,
  ) {
  }

  public async execute(gameId: number): Promise<void> {
    const socialClassDefinitions = await this.socialClassDefinitionRepository.getAll();
    const socialClasses = [];
    for (const socialClassDefinition of socialClassDefinitions) {
      const sector = await this.getSectorByGameAndTypeQueryHandler.handle(new GetSectorByGameAndTypeQuery(
        gameId,
        socialClassDefinition.sectorType,
      ));
      socialClasses.push(
        aSocialClass()
          .withSectorId(sector.id)
          .withGameId(gameId)
          .withEconomicalSituation(socialClassDefinition.defaultEconomicalSituation)
          .withDefinitionId(socialClassDefinition.id)
          .build(),
      );
    }
    await this.socialClassRepository.createMany(socialClasses);
  }
}
