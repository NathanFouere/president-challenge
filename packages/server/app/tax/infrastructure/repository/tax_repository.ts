import type ITaxRepository from '#tax/domain/repository/i_tax_repository';
import Tax from '#tax/domain/model/tax';

export default class TaxRepository implements ITaxRepository {
  public async save(tax: Tax): Promise<void> {
    await tax.save();
  }

  public async createMany(taxes: Tax[]): Promise<void> {
    await Tax.createMany(taxes);
  }
}
