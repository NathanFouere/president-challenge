import type LawDefinition from '#law/domain/model/law_definition';

export default abstract class ILawDefinitionRepository {
  public abstract save(law: LawDefinition): Promise<void>;

  public abstract createMany(law: LawDefinition[]): Promise<void>;
  public abstract saveMany(law: LawDefinition[]): Promise<void>;
  public abstract getAll(): Promise<LawDefinition[]>;
}
