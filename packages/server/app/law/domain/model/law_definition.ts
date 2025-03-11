import { column, belongsTo, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import type { SectorTypes } from '@president-challenge/shared/dist/sector/sector-types.js';
import type { SectorOwnershipType } from '@president-challenge/shared/dist/sector/sector-ownership-type.js';
import LawGroup from '#law/domain/model/law_group';
import type { LawType } from '#law/domain/model/law_type';
import type { BudgetType } from '#budget/domain/model/budget_type';
import type { BudgetLevel } from '#budget/domain/model/budget_level';
import type { TaxType } from '#tax/domain/model/tax_type';
import type { TaxLevel } from '#tax/domain/model/tax_level';
import SocialClassTypeLawHappinessEffect from '#social-class/domain/models/social_class_type_law_happiness_effect';
import PoliticalAffiliationLawHappinessEffect
  from '#political-party/domain/models/political_affiliation_law_happiness_effect';
import Law from '#law/domain/model/law';
import LawVotesPercentagePerPoliticalAffiliation
  from '#law/domain/model/law_votes_percentage_per_political_affiliation';
import { TimeStampedModel } from '#common/model/timestamped_model';

export default class LawDefinition extends TimeStampedModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare lawGroupId: number;

  @belongsTo(() => LawGroup)
  declare lawGroup: BelongsTo<typeof LawGroup>;

  @column()
  declare type: LawType;

  @column()
  declare name: string;

  @column()
  declare votedByDefault: boolean;

  @column()
  declare description: string;

  @column()
  declare politicalWeightRequired: number;

  @column()
  declare order: number;

  // TODO => those attributes should be moved in separate tables
  // Simulates a SingleInheritance
  @column()
  declare budgetTypeToChange?: BudgetType;

  // Simulates a SingleInheritance
  @column()
  declare budgetLevelToChange?: BudgetLevel;

  // Simulates a SingleInheritance
  @column()
  declare sectorTypeToChange?: SectorTypes;

  // Simulates a SingleInheritance
  @column()
  declare sectorOwnershipTypeToChange?: SectorOwnershipType;

  // Simulates a SingleInheritance
  @column()
  declare taxTypeToChange?: TaxType;

  // Simulates a SingleInheritance
  @column()
  declare taxLevelToChange?: TaxLevel;

  @hasMany(() => SocialClassTypeLawHappinessEffect)
  declare socialClassesHappinessEffects: HasMany<typeof SocialClassTypeLawHappinessEffect>;

  @hasMany(() => PoliticalAffiliationLawHappinessEffect)
  declare politicalPartiesAffiliationHappinessEffects: HasMany<typeof PoliticalAffiliationLawHappinessEffect>;

  @hasMany(() => LawVotesPercentagePerPoliticalAffiliation)
  declare percentagesOfVotesForPoliticalParty: HasMany<typeof LawVotesPercentagePerPoliticalAffiliation>;

  @hasMany(() => Law, {
    foreignKey: 'definitionId',
  })
  declare laws: HasMany<typeof Law>;
}
