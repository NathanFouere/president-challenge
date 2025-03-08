import type VotesForPoliticalPartyInElection from '#election/domain/model/votes_for_political_party_in_election';

export default abstract class IVotesForPoliticalPartyInElectionRepository {
  public abstract save(votesForPoliticalPartyInElection: VotesForPoliticalPartyInElection): Promise<void>;
  public abstract saveMany(votesForPoliticalPartyInElections: VotesForPoliticalPartyInElection[]): Promise<void>;
  public abstract createMany(votesForPoliticalPartyInElections: VotesForPoliticalPartyInElection[]): Promise<void>;
}
