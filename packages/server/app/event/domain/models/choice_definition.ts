import { belongsTo, column, hasMany, hasOne } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations';
import Choice from '#event/domain/models/choice';
import EventDefinition from '#event/domain/models/event_definition';
import { TimeStampedModel } from '#common/model/timestamped_model';
import PoliticalAffiliationChoiceHappinessEffect
  from '#political-party/domain/models/political_affiliation_choice_happiness_effect';
import SocialClassTypeChoiceHappinessEffect from '#social-class/domain/models/social_class_type_choice_happiness_effect';
import GameDefinition from '#game/domain/models/game_definition';

export default class ChoiceDefinition extends TimeStampedModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare text: string;

  @column()
  declare eventDefinitionId: number;

  @belongsTo(() => EventDefinition)
  declare eventDefinition: BelongsTo<typeof EventDefinition>;

  @column()
  declare triggerEventDefinitionId: number | null;

  @hasMany(() => Choice, {
    foreignKey: 'definitionId',
  })
  declare laws: HasMany<typeof Choice>;

  @hasOne(() => EventDefinition, {
    localKey: 'triggerEventDefinitionId',
    foreignKey: 'id',
  })
  declare triggerEventDefinition: HasOne<typeof EventDefinition>;

  @hasMany(() => SocialClassTypeChoiceHappinessEffect)
  declare socialClassHappinessEffects: HasMany<typeof SocialClassTypeChoiceHappinessEffect>;

  @hasMany(() => PoliticalAffiliationChoiceHappinessEffect)
  declare politicalAffiliationHappinessEffects: HasMany<typeof PoliticalAffiliationChoiceHappinessEffect>;

  @column()
  declare gameDefinitionIdentifier: string;

  @belongsTo(() => GameDefinition)
  declare gameDefinition: BelongsTo<typeof GameDefinition>;
}
