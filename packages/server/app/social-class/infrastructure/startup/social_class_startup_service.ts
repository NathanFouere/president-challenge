import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { SocialClassTypes } from '@shared/types/social-class/social-class-types.js';
import type { HappinessLevels } from '@shared/types/common/happiness-levels.js';
import type { WealthLevels } from '@shared/types/social-class/wealth-levels.js';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { SocialClassRepository } from '#social-class/infrastructure/repositories/social_class_repository';
import { aSocialClass } from '#social-class/application/builders/social_class_builder';
import socialClassStartupConfigValues from '#game-config/social-class/social-class-startup-config.json' assert { type: 'json' };

@inject()
export class SocialClassStartupService {
  constructor(
    private readonly socialClassRepository: SocialClassRepository,
  ) {
  }

  public async initialize(gameId: number): Promise<void> {
    for (const socialClassValues of socialClassStartupConfigValues) {
      const socialClass = aSocialClass()
        .withSocialClassType(socialClassValues.type as SocialClassTypes)
        .withGameId(gameId)
        .withColor(socialClassValues.color)
        .withHappinessLevel(socialClassValues.happinessLevel as HappinessLevels)
        .withDescription(socialClassValues.description)
        .withName(socialClassValues.name)
        .withWealthLevel(socialClassValues.wealthLevel as WealthLevels)
        .build();

      await this.socialClassRepository.saveWithLicensedFiles(socialClass, socialClassValues.licensedFilesIdentifiers);
    }
  }
}
