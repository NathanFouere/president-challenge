import type Senate from '#legislature/domain/models/senate';

export default abstract class ISenateRepository {
  public abstract findById(senateId: number): Promise<Senate | null>;
  public abstract save(senate: Senate): Promise<void>;
}
