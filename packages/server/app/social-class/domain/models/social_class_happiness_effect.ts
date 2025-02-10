import { BaseModel, column } from '@adonisjs/lucid/orm';
import type { SocialClassTypes } from '@shared/dist/social-class/social-class-types.js';
import type { HappinessModifierType } from '@shared/dist/common/happiness-modifier-type.js';

export default abstract class SocialClassHappinessEffect extends BaseModel {
  @column({ isPrimary: true })
  declare identifier: string;

  @column()
  declare socialClassType: SocialClassTypes;

  @column()
  declare happinessModifier: number;

  @column()
  declare duration: number | null;

  @column()
  declare type: HappinessModifierType;
}
