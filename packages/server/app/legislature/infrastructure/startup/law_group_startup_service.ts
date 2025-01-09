import { inject } from '@adonisjs/core';

import type { SectorTypes } from '@shared/dist/sector/sector-types.js';
import type { SectorOwnershipType } from '@shared/dist/sector/sector-ownership-type.js';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ILawGroupRepository from '#legislature/domain/repository/i_law_group_repository';
import groupTypeStartupValue from '#game-config/law/group-type-startup-value.json' assert { type: 'json' };
import { aLawGroup } from '#legislature/application/builders/law_group_builder';
import { aPropertyLaw } from '#legislature/application/builders/property_law_builder';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IPropertyLawRepository from '#legislature/domain/repository/i_property_law_repository';
import type {
  PropertyLawStartupInterface,
} from '#legislature/infrastructure/startup/startup-interface/property_law_startup_interface';

@inject()
export default class LawGroupStartupService {
  constructor(
    private readonly lawGroupRepository: ILawGroupRepository,
    private readonly propertyLawRepository: IPropertyLawRepository,
  ) {
  }

  public async initialize(gameId: number): Promise<void> {
    for (const groupType of groupTypeStartupValue) {
      const lawGroup = aLawGroup()
        .named(groupType.name)
        .ofType(groupType.type)
        .inGame(gameId)
        .withDescription(groupType.description)
        .build();

      await this.lawGroupRepository.save(lawGroup);
      await this.createPropertyLaws(gameId, groupType.propertyLaws as PropertyLawStartupInterface[]);
    }
  }

  private async createPropertyLaws(gameId: number, propertyLawsStartupValue: PropertyLawStartupInterface[]): Promise<void> {
    const propertyLaws = [];
    for (const propertyLawConfig of propertyLawsStartupValue) {
      const propertyLaw = aPropertyLaw()
        .forGame(gameId)
        .withName(propertyLawConfig.name)
        .withDescription(propertyLawConfig.description)
        .withSectorType(propertyLawConfig.sectorType as SectorTypes)
        .withSectorOwnershipTypeFrom(propertyLawConfig.sectorOwnershipTypeFrom as SectorOwnershipType)
        .withSectorOwnershipTypeTo(propertyLawConfig.sectorOwnershipTypeTo as SectorOwnershipType)
        .withOrder(propertyLawConfig.order)
        .withVote(false)
        .build();

      propertyLaws.push(propertyLaw);
    }
    await this.propertyLawRepository.createMany(propertyLaws);
  }
}
