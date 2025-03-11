import { column } from '@adonisjs/lucid/orm';
import type { HappinessModifierType } from '@president-challenge/shared/dist/common/happiness-modifier-type.js';
import type { PoliticalAffiliation } from '@president-challenge/shared/dist/political-party/political-affiliation.js';
import { TimeStampedModel } from '#common/model/timestamped_model';

export default abstract class PoliticalAffiliationHappinessEffect extends TimeStampedModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare politicalAffiliation: PoliticalAffiliation;

  @column()
  declare happinessModifier: number;

  @column()
  declare duration: number | null;

  @column()
  declare type: HappinessModifierType;
}
