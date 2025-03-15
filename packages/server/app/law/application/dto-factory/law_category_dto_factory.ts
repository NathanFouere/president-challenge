import { inject } from '@adonisjs/core';
import type { LawCategoryDto } from '@president-challenge/shared/dist/legislature/law-category-dto.js';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import LawGroupDtoFactory from '#law/application/dto-factory/law_group_dto_factory';
import type LawCategory from '#law/domain/model/law_category';

@inject()
export default class LawCategoryDtoFactory {
  constructor(
    private readonly lawGroupDtoFactory: LawGroupDtoFactory,
  ) {
  }

  public createFromLawCategories(lawCategories: LawCategory[]): LawCategoryDto[] {
    return lawCategories.map(lawCategory => this.createFromLawCategory(lawCategory));
  }

  public createFromLawCategory(lawCategory: LawCategory): LawCategoryDto {
    return {
      id: lawCategory.id,
      name: lawCategory.name,
      description: lawCategory.description,
      lawGroups: this.lawGroupDtoFactory.createFromLawGroups(lawCategory.lawGroups),
    };
  }
}
