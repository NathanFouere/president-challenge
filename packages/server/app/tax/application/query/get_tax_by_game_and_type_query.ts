import type { TaxType } from '#tax/domain/model/tax_type';

export default class GetTaxByGameAndTypeQuery {
  constructor(
    public readonly gameId: number,
    public readonly taxType: TaxType,
  ) {
  }
}
