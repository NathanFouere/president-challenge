import type { SocialClassDto } from '@shared/types/social-class/social-class-dto.js';
import { inject } from '@adonisjs/core';
import type SocialClass from '#social-class/domain/models/social_class';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LicensedFileDTOFactory } from '#licensed-file/application/factory/licensed_file_dto_factory';

@inject()
export class SocialClassDtoFactory {
  constructor(
    private readonly licensedFileDTOFactory: LicensedFileDTOFactory,
  ) {
  }

  public createFromSocialClass(socialClass: SocialClass): SocialClassDto {
    return {
      id: socialClass.id,
      name: socialClass.name,
      description: socialClass.description,
      color: socialClass.color,
      wealthLevel: this.getCorrespondingWealthLevel(socialClass.wealthLevel),
      socialClassType: socialClass.socialClassType,
      licensedFiles: this.licensedFileDTOFactory.createFromLicensedFiles(socialClass.licensedFiles),
    };
  }

  private getCorrespondingWealthLevel(wealthLevel: number): string {
    const wealthLevels = ['Very low', 'Low', 'Medium', 'High', 'Very High'];
    if (wealthLevel < 0 || wealthLevel >= wealthLevels.length) {
      throw new Error('Invalid wealth level');
    }
    return wealthLevels[wealthLevel];
  }
}
