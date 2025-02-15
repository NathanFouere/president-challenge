import type ITaxDefinitionRepository from '#tax/domain/repository/i_tax_definition_repository';
import TaxDefinition from '#tax/domain/model/tax_definition';

export default class TaxDefinitionRepository implements ITaxDefinitionRepository {
  public async save(tax: TaxDefinition): Promise<void> {
    await tax.save();
  }

  public async createMany(taxes: TaxDefinition[]): Promise<void> {
    await TaxDefinition.createMany(taxes);
  }

  public async findAll(): Promise<TaxDefinition[]> {
    return await TaxDefinition.all();
  }
}
