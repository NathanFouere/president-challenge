import { belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import LawEffect from '#law/domain/model/law-effect/law_effect';
import Tax from '#tax/domain/model/tax';
import type { TaxLevel } from '#tax/domain/model/tax_level';

export default class TaxLevelLawEffect extends LawEffect {
  @column()
  declare taxId: number;

  @belongsTo(() => Tax)
  declare tax: BelongsTo<typeof Tax>;

  @column()
  declare level: TaxLevel;

  public apply(): void {
    this.tax.level = this.level;
  }
}
