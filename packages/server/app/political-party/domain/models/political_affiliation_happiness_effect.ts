import { BaseModel, column } from '@adonisjs/lucid/orm';
import type { HappinessModifierType } from '@shared/dist/common/happiness-modifier-type.js';
import type { PoliticalAffiliation } from '@shared/dist/political-party/political-affiliation.js';

export default class PoliticalPartyHappinessEffect extends BaseModel {
  @column({ isPrimary: true })
  declare identifier: string;

  @column()
  declare politicalAffiliation: PoliticalAffiliation;

  @column()
  declare happinessModifier: number;

  @column()
  declare duration: number | null;

  @column()
  declare type: HappinessModifierType;
}
