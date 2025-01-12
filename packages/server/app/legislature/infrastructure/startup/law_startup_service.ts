import { inject } from '@adonisjs/core';

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
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  IGetPoliticalPartyPerAffiliationInGameQueryHandler,
} from '#political-party/application/queries/i_get_political_party_per_affiliation_in_game_query_handler';
import type {
  VotePerAffiliationStartupInterface,
} from '#legislature/infrastructure/startup/startup-interface/vote_per_affiliation_startup_interface';
import GetPoliticalPartyPerAffiliationInGameQuery
  from '#political-party/application/queries/get_political_party_per_affiliation_in_game_query';
import { aLawVotesPerPoliticalParty } from '#legislature/application/builders/law_votes_percentage_per_political_party_builder';
import type LawVotesPercentagePerPoliticalParty from '#legislature/domain/models/law_votes_percentage_per_political_party';

@inject()
export default class LawStartupService implements StartupProcessorStep {
  constructor(
    private readonly lawGroupRepository: ILawGroupRepository,
    private readonly propertyLawRepository: IPropertyLawRepository,
    private readonly lawCategoryRepository: ILawCategoryRepository,
    private readonly getPoliticalPartyPerAffiliationInGameQueryHandler: IGetPoliticalPartyPerAffiliationInGameQueryHandler,
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
      createLawCategoriesPromises.push(this.createLawGroups(gameId, lawCategory.id, lawCategoryStartupValue.lawGroups));
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
      createPropertyLawsPromises.push(this.createPropertyLaws(gameId, lawGroup.id, lawGroupStartupValue.propertyLaws));
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
        .withSectorType(propertyLawConfig.sectorType)
        .withSectorOwnershipTypeTo(propertyLawConfig.sectorOwnershipTypeTo)
        .withOrder(propertyLawConfig.order)
        .withLawGroupId(lawGroupId)
        .withVoted(propertyLawConfig.voted)
        .build();

      propertyLaw.votesPercentagePerPoliticalParties = await this.createsVotesPercentagesForPoliticalAffiliation(gameId, propertyLawConfig.votesPerAffiliation);
      propertyLaws.push(propertyLaw);
    }
    await this.propertyLawRepository.createMany(propertyLaws);
  }

  private async createsVotesPercentagesForPoliticalAffiliation(gameId: number, votePerAffiliationStartupValues: VotePerAffiliationStartupInterface[]): Promise<LawVotesPercentagePerPoliticalParty[]> {
    const votesPerPoliticalParty = [];
    for (const votePerAffiliationStartupValue of votePerAffiliationStartupValues) {
      const votePerPoliticalParty = await this.createVotePercentageForPoliticalAffiliation(gameId, votePerAffiliationStartupValue);
      votesPerPoliticalParty.push(votePerPoliticalParty);
    }

    return votesPerPoliticalParty;
  }

  private async createVotePercentageForPoliticalAffiliation(gameId: number, votePerAffiliationStartupValue: VotePerAffiliationStartupInterface): Promise<LawVotesPercentagePerPoliticalParty> {
    const politicalParty = await this.getPoliticalPartyPerAffiliationInGameQueryHandler.handle(new GetPoliticalPartyPerAffiliationInGameQuery(
      gameId,
      votePerAffiliationStartupValue.affiliation,
    ));
    return aLawVotesPerPoliticalParty()
      .withPoliticalPartyId(politicalParty.id)
      .withPercentageVoteFor(votePerAffiliationStartupValue.percentageVoteFor)
      .build();
  }
}
