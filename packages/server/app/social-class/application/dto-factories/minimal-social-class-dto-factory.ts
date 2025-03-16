import type { MinimalSocialClassDto } from '@president-challenge/shared/dist/social-class/minimal-social-class-dto.js';
import { inject } from '@adonisjs/core';
import type SocialClass from '#social-class/domain/models/social_class';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LicensedFileDTOFactory } from '#licensed-file/application/factory/licensed_file_dto_factory';

@inject()
export class MinimalSocialClassDtoFactory {
  constructor(
    private readonly licensedFileDtoFactory: LicensedFileDTOFactory,
  ) {
  }

  public async createFromSocialClass(socialClass: SocialClass): Promise<MinimalSocialClassDto> {
    return {
      id: socialClass.id,
      name: socialClass.definition.name,
      description: socialClass.definition.description,
      color: socialClass.definition.color,
      socialClassType: socialClass.definition.subType,
      licensedFile: await this.licensedFileDtoFactory.createFromLicensedFile(socialClass.definition.licensedFiles[0]),
    };
  }

  public async createFromSocialClasses(socialClasses: SocialClass[]): Promise<MinimalSocialClassDto[]> {
    return Promise.all(socialClasses.map(socialClass => this.createFromSocialClass(socialClass)),
    );
  }
}
