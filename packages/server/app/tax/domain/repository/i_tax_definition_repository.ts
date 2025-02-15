import type TaxDefinition from '#tax/domain/model/tax_definition';

export default abstract class ITaxDefinitionRepository {
  public abstract save(tax: TaxDefinition): Promise<void>;
  public abstract createMany(taxes: TaxDefinition[]): Promise<void>;
  public abstract findAll(): Promise<TaxDefinition[]>;
}
