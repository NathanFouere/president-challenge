import { belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import PoliticalAffiliationHappinessEffect from '#political-party/domain/models/political_affiliation_happiness_effect';
import ChoiceDefinition from '#event/domain/models/choice_definition';

export default class PoliticalAffiliationChoiceHappinessEffect extends PoliticalAffiliationHappinessEffect {
  @column()
  declare choiceDefinitionId: number;

  @belongsTo(() => ChoiceDefinition)
  declare choiceDefinition: BelongsTo<typeof ChoiceDefinition>;
}
