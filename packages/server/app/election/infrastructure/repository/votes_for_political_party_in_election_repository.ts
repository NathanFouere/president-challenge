import type IVotesForPoliticalPartyInElectionRepository
  from '#election/domain/repository/i_votes_for_political_party_in_election_repository';
import VotesForPoliticalPartyInElection from '#election/domain/model/votes_for_political_party_in_election';

export default class VotesForPoliticalPartyInElectionRepository implements IVotesForPoliticalPartyInElectionRepository {
  public async save(votesForPoliticalPartyInElection: VotesForPoliticalPartyInElection): Promise<void> {
    await votesForPoliticalPartyInElection.save();
  }

  public async saveMany(votesForPoliticalPartyInElections: VotesForPoliticalPartyInElection[]): Promise<void> {
    await VotesForPoliticalPartyInElection.createMany(votesForPoliticalPartyInElections);
  }

  public async createMany(votesForPoliticalPartyInElections: VotesForPoliticalPartyInElection[]): Promise<void> {
    await VotesForPoliticalPartyInElection.createMany(votesForPoliticalPartyInElections);
  }
}
