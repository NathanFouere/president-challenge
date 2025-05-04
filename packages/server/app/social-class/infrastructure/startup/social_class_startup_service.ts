import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ISocialClassRepository from '#social-class/domain/repository/i_social_class_repository';
import { aSocialClass } from '#social-class/application/builders/social_class_builder';
import type { StartupProcessorStep } from '#common/startup/startup_processor_step';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetSectorByGameAndTypeQueryHandler from '#sector/application/query/i_get_sector_by_game_and_type_query_handler';
import { GetSectorByGameAndTypeQuery } from '#sector/application/query/get_sector_by_game_and_type_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetSocialClassesDefinitionsByGameDefinitionQueryHandler
  from '#social-class/application/queries/i_get_social_classes_definitions_by_game_definition_query_handler';
import GetSocialClassesDefinitionsByGameDefinitionQuery
  from '#social-class/application/queries/get_social_classes_definitions_by_game_definition_query';

@inject()
export class SocialClassStartupService implements StartupProcessorStep {
  constructor(
    private readonly socialClassRepository: ISocialClassRepository,
    private readonly getSectorByGameAndTypeQueryHandler: IGetSectorByGameAndTypeQueryHandler,
    private readonly getSocialClassesDefinitionsByGameDefinitionQueryHandler: IGetSocialClassesDefinitionsByGameDefinitionQueryHandler,
  ) {
  }

  public async execute(gameId: number, gameDefinitionIdentifier: string): Promise<void> {
    const socialClassDefinitions = await this.getSocialClassesDefinitionsByGameDefinitionQueryHandler.handle(
      new GetSocialClassesDefinitionsByGameDefinitionQuery(gameDefinitionIdentifier),
    );
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
