import { column } from '@adonisjs/lucid/orm';
import type { SocialClassTypes } from '@shared/dist/social-class/social-class-types.js';
import type { HappinessModifierType } from '@shared/dist/common/happiness-modifier-type.js';
import { TimeStampedModel } from '#common/model/timestamped_model';

export default abstract class SocialClassTypeHappinessEffect extends TimeStampedModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare socialClassType: SocialClassTypes;

  @column()
  declare happinessModifier: number;

  @column()
  declare duration: number | null;

  @column()
  declare type: HappinessModifierType;
}
