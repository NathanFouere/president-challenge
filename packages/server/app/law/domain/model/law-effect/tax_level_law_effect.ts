import { column } from '@adonisjs/lucid/orm';
import LawEffect from '#law/domain/model/law-effect/law_effect';
import type { TaxLevel } from '#tax/domain/model/tax_level';
import type { TaxType } from '#tax/domain/model/tax_type';

export default class TaxLevelLawEffect extends LawEffect {
  @column()
  declare taxType: TaxType;

  @column()
  declare level: TaxLevel;
}
