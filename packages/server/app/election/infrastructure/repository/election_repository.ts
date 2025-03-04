import type IElectionRepository from '#election/domain/repository/i_election_repository';
import Election from '#election/domain/model/election';

export default class ElectionRepository implements IElectionRepository {
  public async save(election: Election): Promise<void> {
    await election.save();
  }

  public async saveMany(elections: Election[]): Promise<void> {
    await Election.createMany(elections);
  }
}
