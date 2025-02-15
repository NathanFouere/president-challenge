import type Law from '#law/domain/model/law';

export default abstract class ILawRepository {
  public abstract save(law: Law): Promise<void>;

  public abstract createMany(law: Law[]): Promise<void>;
  public abstract saveMany(law: Law[]): Promise<void>;
  public abstract getAll(): Promise<Law[]>;
}
