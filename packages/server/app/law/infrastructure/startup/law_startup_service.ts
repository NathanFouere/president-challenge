import { inject } from '@adonisjs/core';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ILawGroupRepository from '#law/domain/repository/i_law_group_repository';
import lawCategoriesStartupValue from '#game-config/law/laws-startup-value.json' assert { type: 'json' };
import { aLawGroup } from '#law/application/builder/law_group_builder';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ILawRepository from '#law/domain/repository/i_law_repository';
import type {
  LawStartupInterface,
} from '#law/infrastructure/startup/startup-interface/law_startup_interface';
import type { StartupProcessorStep } from '#common/startup/startup_processor_step';
import type {
  LawGroupStartupInterface,
} from '#law/infrastructure/startup/startup-interface/law_group_startup_interface';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ILawCategoryRepository from '#law/domain/repository/i_law_category_repository';
import { aLawCategory } from '#law/application/builder/law_category_builder';
import type LawCategoryStartupInterface
  from '#law/infrastructure/startup/startup-interface/law_category_startup_interface';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  IGetPoliticalPartyPerAffiliationInGameQueryHandler,
} from '#political-party/application/queries/i_get_political_party_per_affiliation_in_game_query_handler';
import type {
  VotePerAffiliationStartupInterface,
} from '#law/infrastructure/startup/startup-interface/vote_per_affiliation_startup_interface';
import GetPoliticalPartyPerAffiliationInGameQuery
  from '#political-party/application/queries/get_political_party_per_affiliation_in_game_query';
import { aLawVotesPerPoliticalParty } from '#law/application/builder/law_votes_percentage_per_political_party_builder';
import type LawVotesPercentagePerPoliticalParty from '#law/domain/model/law_votes_percentage_per_political_party';
import { aLaw } from '#law/application/builder/law_builder';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  ILawVotesPercentagePerPoliticalPartyRepository,
} from '#law/domain/repository/i_law_votes_percentage_per_political_party_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SocialClassHappinessLawEffectService
  from '#law/application/service/law-effect/social_class_happiness_law_effect_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ApplyPoliticalPartiesHappinessLawEffectService
  from '#law/application/service/law-effect/apply_political_parties_happiness_law_effect_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { IGetLawByGameQueryHandler } from '#law/application/query/i_get_law_by_game_query_handler';
import GetLawByGameQuery from '#law/application/query/get_law_by_game_and_type_query';
import type Law from '#law/domain/model/law';

@inject()
export default class LawStartupService implements StartupProcessorStep {
  constructor(
    private readonly lawGroupRepository: ILawGroupRepository,
    private readonly lawRepository: ILawRepository,
    private readonly lawCategoryRepository: ILawCategoryRepository,
    private readonly getPoliticalPartyPerAffiliationInGameQueryHandler: IGetPoliticalPartyPerAffiliationInGameQueryHandler,
    private readonly lawVotesPercentagePerPoliticalPartyRepository: ILawVotesPercentagePerPoliticalPartyRepository,
    private readonly applySocialClassesHappinessEffects: SocialClassHappinessLawEffectService,
    private readonly applyPoliticalPartiesHappinessEffects: ApplyPoliticalPartiesHappinessLawEffectService,
    private readonly getLawByGameAndTypeQueryHandler: IGetLawByGameQueryHandler,
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
    const createLawPromises = [];
    for (const lawGroupStartupValue of lawGroupStartupValues) {
      const lawGroup = aLawGroup()
        .named(lawGroupStartupValue.name)
        .withDescription(lawGroupStartupValue.description)
        .inCategory(lawCategoryId)
        .build();

      await this.lawGroupRepository.save(lawGroup);
      createLawPromises.push(this.createLaws(gameId, lawGroup.id, lawGroupStartupValue.laws));
    }
    await Promise.all(createLawPromises);
  }

  private async createLaws(gameId: number, lawGroupId: number, lawsStartupValue: LawStartupInterface[]): Promise<void> {
    const lawsPromises = [];
    for (const lawStartupInterface of lawsStartupValue) {
      lawsPromises.push(this.createLaw(gameId, lawGroupId, lawStartupInterface));
    }
    await Promise.all(lawsPromises);
  }

  private async createLaw(gameId: number, lawGroupId: number, lawStartupInterface: LawStartupInterface): Promise<void> {
    const law = aLaw()
      .forGame(gameId)
      .withName(lawStartupInterface.name)
      .withOrder(lawStartupInterface.order)
      .withDescription(lawStartupInterface.description)
      .withLawGroupId(lawGroupId)
      .withType(lawStartupInterface.type)
      .withPoliticalWeightRequired(lawStartupInterface.politicalWeightRequired)
      .withVoted(lawStartupInterface.voted)
      .withLawEffectIdentifier(lawStartupInterface.effectIdentifier)
      .build();

    await this.lawRepository.save(law);

    await this.createsVotesPercentagesForPoliticalAffiliation(gameId, law.id, lawStartupInterface.votesPerAffiliation);
    if (law.voted) {
      await this.applyLawEffect(law, gameId);
    }
  }

  private async applyLawEffect(law: Law, gameId: number): Promise<void> {
    const updatedLaw = await this.getLawByGameAndTypeQueryHandler.handleForVote(new GetLawByGameQuery(
      law.id,
      gameId,
    ));

    await Promise.all([
      this.applySocialClassesHappinessEffects.applySocialClassesHappinessEffects(updatedLaw, gameId),
      this.applyPoliticalPartiesHappinessEffects.applyPoliticalPartiesHappinessEffects(updatedLaw, gameId),
    ]);
  }

  private async createsVotesPercentagesForPoliticalAffiliation(gameId: number, lawId: number, votePerAffiliationStartupValues: VotePerAffiliationStartupInterface[]): Promise<void> {
    const votesPerPoliticalParty = [];
    for (const votePerAffiliationStartupValue of votePerAffiliationStartupValues) {
      const votePerPoliticalParty = await this.createVotePercentageForPoliticalAffiliation(gameId, lawId, votePerAffiliationStartupValue);
      votesPerPoliticalParty.push(votePerPoliticalParty);
    }

    await this.lawVotesPercentagePerPoliticalPartyRepository.createMany(votesPerPoliticalParty);
  }

  private async createVotePercentageForPoliticalAffiliation(gameId: number, lawId: number, votePerAffiliationStartupValue: VotePerAffiliationStartupInterface): Promise<LawVotesPercentagePerPoliticalParty> {
    const politicalParty = await this.getPoliticalPartyPerAffiliationInGameQueryHandler.handle(new GetPoliticalPartyPerAffiliationInGameQuery(
      gameId,
      votePerAffiliationStartupValue.affiliation,
    ));
    return aLawVotesPerPoliticalParty()
      .withPoliticalPartyId(politicalParty.id)
      .withLawId(lawId)
      .withPercentage(votePerAffiliationStartupValue.percentageVoteFor)
      .build();
  }
}
