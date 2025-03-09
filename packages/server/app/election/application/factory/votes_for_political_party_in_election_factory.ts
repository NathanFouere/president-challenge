import VotesForPoliticalPartyInElection from '#election/domain/model/votes_for_political_party_in_election';
import type PoliticalParty from '#political-party/domain/models/political_party';
import type Election from '#election/domain/model/election';

export default class VotesForPoliticalPartyInElectionFactory {
  public createVotesForPoliticalPartyInElection(
    election: Election,
    politicalParty: PoliticalParty,
    votes: number,
  ): VotesForPoliticalPartyInElection {
    const votesForPoliticalPartyInElection = new VotesForPoliticalPartyInElection();
    votesForPoliticalPartyInElection.setElection(election);
    votesForPoliticalPartyInElection.setPoliticalParty(politicalParty);
    votesForPoliticalPartyInElection.votes = Math.floor(votes);
    return votesForPoliticalPartyInElection;
  }
}
