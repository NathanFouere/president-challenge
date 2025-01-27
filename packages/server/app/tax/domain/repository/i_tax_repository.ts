import type Tax from '#tax/domain/model/tax';

export default abstract class ITaxRepository {
  public abstract save(tax: Tax): Promise<void>;
  public abstract createMany(taxes: Tax[]): Promise<void>;
}
