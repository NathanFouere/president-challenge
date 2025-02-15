import type TaxDto from '@shared/dist/tax/tax-dto.js';
import type { LevelDto } from '@shared/dist/common/level-dto.js';
import type Tax from '#tax/domain/model/tax';
import { TaxLevel } from '#tax/domain/model/tax_level';

export default class TaxDtoFactory {
  public fromTaxes(taxes: Tax[]): TaxDto[] {
    return taxes.map((tax: Tax) => this.fromTax(tax));
  }

  public fromTax(tax: Tax): TaxDto {
    return {
      id: tax.id,
      name: tax.definition.name,
      description: tax.definition.description,
      level: this.getLevelDtoFromLevel(tax.level),
    };
  }

  private getLevelDtoFromLevel(level: TaxLevel): LevelDto {
    switch (level) {
      case TaxLevel.VERY_LOW:
        return { name: 'Very-Low', color: '#FF0000' };
      case TaxLevel.LOW:
        return { name: 'Low', color: '#FFA500' };
      case TaxLevel.MEDIUM:
        return { name: 'Medium', color: '#FFFF00' };
      case TaxLevel.HIGH:
        return { name: 'High', color: '#008000' };
      case TaxLevel.VERY_HIGH:
        return { name: 'Very-High', color: '#0000FF' };
    }
  };
}
