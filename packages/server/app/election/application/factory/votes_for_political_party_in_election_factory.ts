import VotesForPoliticalPartyInElection from '#election/domain/model/votes_for_political_party_in_election';

export default class VotesForPoliticalPartyInElectionFactory {
  public createVotesForPoliticalPartyInElection(
    electionId: number,
    politicalPartyId: number,
    votes: number,
  ): VotesForPoliticalPartyInElection {
    const votesForPoliticalPartyInElection = new VotesForPoliticalPartyInElection();
    votesForPoliticalPartyInElection.electionId = electionId;
    votesForPoliticalPartyInElection.politicalPartyId = politicalPartyId;
    votesForPoliticalPartyInElection.votes = Math.floor(votes);
    return votesForPoliticalPartyInElection;
  }
}
