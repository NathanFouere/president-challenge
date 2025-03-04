import type Election from '#election/domain/model/election';

export default abstract class IElectionRepository {
  public abstract save(election: Election): Promise<void>;
  public abstract saveMany(elections: Election[]): Promise<void>;
}
