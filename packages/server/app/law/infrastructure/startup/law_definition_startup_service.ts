import { inject } from '@adonisjs/core';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ILawGroupRepository from '#law/domain/repository/i_law_group_repository';
import lawCategoriesStartupValue from '#game-config/law/laws-startup-value.json' assert { type: 'json' };
import { aLawGroup } from '#law/application/builder/law_group_builder';
import type {
  LawStartupInterface,
} from '#law/infrastructure/startup/startup-interface/law_startup_interface';
import type {
  LawGroupStartupInterface,
} from '#law/infrastructure/startup/startup-interface/law_group_startup_interface';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ILawCategoryRepository from '#law/domain/repository/i_law_category_repository';
import { aLawCategory } from '#law/application/builder/law_category_builder';
import type LawCategoryStartupInterface
  from '#law/infrastructure/startup/startup-interface/law_category_startup_interface';
import type {
  VotePerAffiliationStartupInterface,
} from '#law/infrastructure/startup/startup-interface/vote_per_affiliation_startup_interface';
import { aLawVotesPerPoliticalAffiliation } from '#law/application/builder/law_votes_percentage_per_political_affiliation_builder';
import type LawVotesPercentagePerPoliticalAffiliation from '#law/domain/model/law_votes_percentage_per_political_affiliation';
import { aLawDefinition } from '#law/application/builder/law_definition_builder';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  ILawVotesPercentagePerPoliticalPartyRepository,
} from '#law/domain/repository/i_law_votes_percentage_per_political_party_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import LawDefinitionEffectStartupService from '#law/infrastructure/startup/law_definition_effect_startup_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ILawDefinitionRepository from '#law/domain/repository/i_law_definition_repository';

@inject()
export default class LawDefinitionStartupService {
  constructor(
    private readonly lawGroupRepository: ILawGroupRepository,
    private readonly lawDefinitionRepository: ILawDefinitionRepository,
    private readonly lawCategoryRepository: ILawCategoryRepository,
    private readonly lawVotesPercentagePerPoliticalPartyRepository: ILawVotesPercentagePerPoliticalPartyRepository,
    private readonly lawEffectStartupService: LawDefinitionEffectStartupService,
  ) {
  }

  public async execute(): Promise<void> {
    await this.createLawCategories(lawCategoriesStartupValue as LawCategoryStartupInterface[]);
  }

  private async createLawCategories(lawCategoriesStartupValue: LawCategoryStartupInterface[]): Promise<void> {
    const createLawCategoriesPromises = [];
    for (const lawCategoryStartupValue of lawCategoriesStartupValue) {
      const lawCategory = aLawCategory()
        .named(lawCategoryStartupValue.name)
        .withDescription(lawCategoryStartupValue.description)
        .build();

      await this.lawCategoryRepository.save(lawCategory);
      createLawCategoriesPromises.push(this.createLawGroups(lawCategory.id, lawCategoryStartupValue.lawGroups));
    }
    await Promise.all(createLawCategoriesPromises);
  }

  private async createLawGroups(lawCategoryId: number, lawGroupStartupValues: LawGroupStartupInterface[]): Promise<void> {
    const createLawPromises = [];
    for (const lawGroupStartupValue of lawGroupStartupValues) {
      const lawGroup = aLawGroup()
        .named(lawGroupStartupValue.name)
        .withDescription(lawGroupStartupValue.description)
        .inCategory(lawCategoryId)
        .build();

      await this.lawGroupRepository.save(lawGroup);
      createLawPromises.push(this.createLaws(lawGroup.id, lawGroupStartupValue.laws));
    }
    await Promise.all(createLawPromises);
  }

  private async createLaws(lawGroupId: number, lawsStartupValue: LawStartupInterface[]): Promise<void> {
    const lawsPromises = [];
    for (const lawStartupInterface of lawsStartupValue) {
      lawsPromises.push(this.createLaw(lawGroupId, lawStartupInterface));
    }
    await Promise.all(lawsPromises);
  }

  private async createLaw(lawGroupId: number, lawStartupInterface: LawStartupInterface): Promise<void> {
    const lawBuilder = aLawDefinition()
      .withName(lawStartupInterface.name)
      .withOrder(lawStartupInterface.order)
      .withDescription(lawStartupInterface.description)
      .withLawGroupId(lawGroupId)
      .withType(lawStartupInterface.type)
      .withPoliticalWeightRequired(lawStartupInterface.politicalWeightRequired)
      .withVoted(lawStartupInterface.voted);

    if (lawStartupInterface.sectorPropertyEffects) {
      lawBuilder
        .withSectorOwnershipTypeToChange(lawStartupInterface.sectorPropertyEffects.ownerShipType)
        .withSectorTypeToChange(lawStartupInterface.sectorPropertyEffects.sectorType);
    }

    if (lawStartupInterface.budgetEffects) {
      lawBuilder
        .withBudgetLevelToChange(lawStartupInterface.budgetEffects.budgetLevel)
        .withBudgetTypeToChange(lawStartupInterface.budgetEffects.budgetType);
    }

    if (lawStartupInterface.taxEffects) {
      lawBuilder
        .withTaxLevelToChange(lawStartupInterface.taxEffects.taxLevel)
        .withTaxTypeToChange(lawStartupInterface.taxEffects.taxType);
    }

    const law = lawBuilder.build();
    await this.lawDefinitionRepository.save(law);

    await this.lawEffectStartupService.createSocialClassHappinessEffects(law.id, lawStartupInterface);
    await this.lawEffectStartupService.createPoliticalAffiliationHappinessEffects(law.id, lawStartupInterface);

    await this.createsVotesPercentagesForPoliticalAffiliation(law.id, lawStartupInterface.votesPerAffiliation);
  }

  private async createsVotesPercentagesForPoliticalAffiliation(lawId: number, votePerAffiliationStartupValues: VotePerAffiliationStartupInterface[]): Promise<void> {
    const votesPerPoliticalParty = [];
    for (const votePerAffiliationStartupValue of votePerAffiliationStartupValues) {
      const votePerPoliticalParty = await this.createVotePercentageForPoliticalAffiliation(lawId, votePerAffiliationStartupValue);
      votesPerPoliticalParty.push(votePerPoliticalParty);
    }

    await this.lawVotesPercentagePerPoliticalPartyRepository.createMany(votesPerPoliticalParty);
  }

  private async createVotePercentageForPoliticalAffiliation(lawId: number, votePerAffiliationStartupValue: VotePerAffiliationStartupInterface): Promise<LawVotesPercentagePerPoliticalAffiliation> {
    return aLawVotesPerPoliticalAffiliation()
      .withPoliticalAffiliation(votePerAffiliationStartupValue.affiliation)
      .withLawId(lawId)
      .withPercentage(votePerAffiliationStartupValue.percentageVoteFor)
      .build();
  }
}
