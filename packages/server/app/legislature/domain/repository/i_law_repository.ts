import type Law from '#legislature/domain/models/law';

export default abstract class ILawRepository {
  public abstract save(law: Law): Promise<void>;

  public abstract createMany(law: Law[]): Promise<void>;
}
