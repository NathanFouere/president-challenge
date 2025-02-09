import type LawEffect from '#law/domain/model/law-effect/law_effect';

export default abstract class ILawEffectRepository {
  public abstract saveOrUpdateAll(lawEffects: LawEffect[]): Promise<void>;
  public abstract getByIdentifier(identifier: string): Promise<LawEffect>;
  public abstract findByIdentifier(identifier: string): Promise<LawEffect | null>;
}
