import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { SocialClassTypes } from '@shared/dist/social-class/social-class-types.js';
import type { WealthLevels } from '@shared/dist/social-class/wealth-levels.js';
import type { SectorTypes } from '@shared/dist/sector/sector-types.js';

import type { HappinessLevels } from '@shared/dist/common/happiness-levels.js';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { SocialClassRepository } from '#social-class/infrastructure/repositories/social_class_repository';
import { aSocialClass } from '#social-class/application/builders/social_class_builder';
import socialClassStartupConfigValues from '#game-config/social-class/social-class-startup-config.json' assert { type: 'json' };
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { GetSectorByGameAndTypeQueryHandler } from '#sector/application/query/get_sector_by_game_and_type_query_handler';
import { GetSectorByGameAndTypeQuery } from '#sector/application/query/get_sector_by_game_and_type_query';

@inject()
export class SocialClassStartupService {
  constructor(
    private readonly socialClassRepository: SocialClassRepository,
    private readonly getSectorByGameAndTypeQueryHandler: GetSectorByGameAndTypeQueryHandler,
  ) {
  }

  public async initialize(gameId: number): Promise<void> {
    for (const socialClassValues of socialClassStartupConfigValues) {
      const socialClassSector = await this.getSectorByGameAndTypeQueryHandler.handle(new GetSectorByGameAndTypeQuery(
        gameId,
        socialClassValues.sectorType as SectorTypes,
      ));

      const socialClass = aSocialClass()
        .withSocialClassType(socialClassValues.type as SocialClassTypes)
        .withGameId(gameId)
        .withColor(socialClassValues.color)
        .withHappinessLevel(socialClassValues.happinessLevel as HappinessLevels)
        .withDescription(socialClassValues.description)
        .withName(socialClassValues.name)
        .withWealthLevel(socialClassValues.wealthLevel as WealthLevels)
        .withSectorId(socialClassSector.id)
        .build();

      await this.socialClassRepository.saveWithLicensedFiles(socialClass, socialClassValues.licensedFilesIdentifiers);
    }
  }
}
