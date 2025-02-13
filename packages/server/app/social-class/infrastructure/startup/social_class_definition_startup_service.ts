import { inject } from '@adonisjs/core';

import type { SectorTypes } from '@shared/dist/sector/sector-types.js';

import type { SocialClassSubtypes } from '@shared/dist/social-class/social-class-subtypes.js';
import type { SocialClassTypes } from '@shared/dist/social-class/social-class-types.js';
import { aSocialClassDefinition } from '#social-class/application/builders/social_class_definition_builder';
import socialClassStartupConfigValues from '#game-config/social-class/social-class-startup-config.json' assert { type: 'json' };
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ISocialClassDefinitionRepository from '#social-class/domain/repository/i_social_class_definition_repository';

@inject()
export class SocialClassDefinitionStartupService {
  constructor(
    private readonly socialClassRepository: ISocialClassDefinitionRepository,
  ) {
  }

  public async execute(): Promise<void> {
    for (const socialClassValues of socialClassStartupConfigValues) {
      const socialClass = aSocialClassDefinition()
        .withType(socialClassValues.type as SocialClassTypes)
        .withSubtype(socialClassValues.subtype as SocialClassSubtypes)
        .withColor(socialClassValues.color)
        .withDescription(socialClassValues.description)
        .withName(socialClassValues.name)
        .withDefaultEconomicalSituation(socialClassValues.economicalSituation)
        .withSectorType(socialClassValues.sectorType as SectorTypes)
        .build();

      await this.socialClassRepository.saveWithLicensedFiles(socialClass, socialClassValues.licensedFilesIdentifiers);
    }
  }
}
