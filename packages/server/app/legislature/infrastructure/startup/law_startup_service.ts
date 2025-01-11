import { inject } from '@adonisjs/core';

import type { SectorTypes } from '@shared/dist/sector/sector-types.js';
import type { SectorOwnershipType } from '@shared/dist/sector/sector-ownership-type.js';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ILawGroupRepository from '#legislature/domain/repository/i_law_group_repository';
import lawCategoriesStartupValue from '#game-config/law/law-categories-startup-value.json' assert { type: 'json' };
import { aLawGroup } from '#legislature/application/builders/law_group_builder';
import { aPropertyLaw } from '#legislature/application/builders/property_law_builder';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IPropertyLawRepository from '#legislature/domain/repository/i_property_law_repository';
import type {
  PropertyLawStartupInterface,
} from '#legislature/infrastructure/startup/startup-interface/property_law_startup_interface';
import type { StartupProcessorStep } from '#common/startup/startup_processor_step';
import type {
  LawGroupStartupInterface,
} from '#legislature/infrastructure/startup/startup-interface/law_group_startup_interface';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ILawCategoryRepository from '#legislature/domain/repository/i_law_category_repository';
import { aLawCategory } from '#legislature/application/builders/law_category_builder';
import type LawCategoryStartupInterface
  from '#legislature/infrastructure/startup/startup-interface/law_category_startup_interface';

@inject()
export default class LawStartupService implements StartupProcessorStep {
  constructor(
    private readonly lawGroupRepository: ILawGroupRepository,
    private readonly propertyLawRepository: IPropertyLawRepository,
    private readonly lawCategoryRepository: ILawCategoryRepository,
  ) {
  }

  public async execute(gameId: number): Promise<void> {
    await this.createLawCategories(gameId, lawCategoriesStartupValue as LawCategoryStartupInterface[]);
  }

  private async createLawCategories(gameId: number, lawCategoriesStartupValue: LawCategoryStartupInterface[]): Promise<void> {
    const createLawCategoriesPromises = [];
    for (const lawCategoryStartupValue of lawCategoriesStartupValue) {
      const lawCategory = aLawCategory()
        .named(lawCategoryStartupValue.name)
        .withDescription(lawCategoryStartupValue.description)
        .inGame(gameId)
        .build();

      await this.lawCategoryRepository.save(lawCategory);
      createLawCategoriesPromises.push(this.createLawGroups(gameId, lawCategory.id, lawCategoryStartupValue.lawGroups as LawGroupStartupInterface[]));
    }
    await Promise.all(createLawCategoriesPromises);
  }

  private async createLawGroups(gameId: number, lawCategoryId: number, lawGroupStartupValues: LawGroupStartupInterface[]): Promise<void> {
    const createPropertyLawsPromises = [];
    for (const lawGroupStartupValue of lawGroupStartupValues) {
      const lawGroup = aLawGroup()
        .named(lawGroupStartupValue.name)
        .withDescription(lawGroupStartupValue.description)
        .inCategory(lawCategoryId)
        .build();

      await this.lawGroupRepository.save(lawGroup);
      createPropertyLawsPromises.push(this.createPropertyLaws(gameId, lawGroup.id, lawGroupStartupValue.propertyLaws as PropertyLawStartupInterface[]));
    }
    await Promise.all(createPropertyLawsPromises);
  }

  private async createPropertyLaws(gameId: number, lawGroupId: number, propertyLawsStartupValue: PropertyLawStartupInterface[]): Promise<void> {
    const propertyLaws = [];
    for (const propertyLawConfig of propertyLawsStartupValue) {
      const propertyLaw = aPropertyLaw()
        .forGame(gameId)
        .withName(propertyLawConfig.name)
        .withDescription(propertyLawConfig.description)
        .withSectorType(propertyLawConfig.sectorType as SectorTypes)
        .withSectorOwnershipTypeTo(propertyLawConfig.sectorOwnershipTypeTo as SectorOwnershipType)
        .withOrder(propertyLawConfig.order)
        .withLawGroupId(lawGroupId)
        .withVoted(propertyLawConfig.voted)
        .build();

      propertyLaws.push(propertyLaw);
    }
    await this.propertyLawRepository.createMany(propertyLaws);
  }
}
