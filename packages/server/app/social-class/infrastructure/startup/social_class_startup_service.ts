import { inject } from '@adonisjs/core';

import type { SectorTypes } from '@shared/dist/sector/sector-types.js';

import type { SocialClassSubtypes } from '@shared/dist/social-class/social-class-subtypes.js';
import type { SocialClassTypes } from '@shared/dist/social-class/social-class-types.js';
import { aSocialClass } from '#social-class/application/builders/social_class_builder';
import socialClassStartupConfigValues from '#game-config/social-class/social-class-startup-config.json' assert { type: 'json' };
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetSectorByGameAndTypeQueryHandler from '#sector/application/query/i_get_sector_by_game_and_type_query_handler';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ISocialClassRepository from '#social-class/domain/repository/i_social_class_repository';
import { GetSectorByGameAndTypeQuery } from '#sector/application/query/get_sector_by_game_and_type_query';
import type { StartupProcessorStep } from '#common/startup/startup_processor_step';

@inject()
export class SocialClassStartupService implements StartupProcessorStep {
  constructor(
    private readonly socialClassRepository: ISocialClassRepository,
    private readonly getSectorByGameAndTypeQueryHandler: IGetSectorByGameAndTypeQueryHandler,
  ) {
  }

  public async execute(gameId: number): Promise<void> {
    for (const socialClassValues of socialClassStartupConfigValues) {
      const socialClassSector = await this.getSectorByGameAndTypeQueryHandler.handle(new GetSectorByGameAndTypeQuery(
        gameId,
        socialClassValues.sectorType as SectorTypes,
      ));

      const socialClass = aSocialClass()
        .withType(socialClassValues.type as SocialClassTypes)
        .withSubtype(socialClassValues.subtype as SocialClassSubtypes)
        .withGameId(gameId)
        .withColor(socialClassValues.color)
        .withDescription(socialClassValues.description)
        .withName(socialClassValues.name)
        .withEconomicalSituation(socialClassValues.economicalSituation)
        .withSectorId(socialClassSector.id)
        .build();

      await this.socialClassRepository.saveWithLicensedFiles(socialClass, socialClassValues.licensedFilesIdentifiers);
    }
  }
}
