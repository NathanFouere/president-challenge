import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import VotesForPoliticalPartyInElectionFactory
  from '#election/application/factory/votes_for_political_party_in_election_factory';
import type PoliticalParty from '#political-party/domain/models/political_party';
import type SocialClass from '#social-class/domain/models/social_class';
import type VotesForPoliticalPartyInElection from '#election/domain/model/votes_for_political_party_in_election';
import type Election from '#election/domain/model/election';

@inject()
export class ElectionVotesService {
  constructor(
    private readonly votesForPoliticalPartyInElectionFactory: VotesForPoliticalPartyInElectionFactory,
  ) {
  }

  public createVotesForPoliticalPartyInElection(election: Election, politicalParties: PoliticalParty[], socialClasses: SocialClass[]): VotesForPoliticalPartyInElection[] {
    const votesForPoliticalPartyInElections: VotesForPoliticalPartyInElection[] = [];

    for (const politicalParty of politicalParties) {
      let votesForPoliticalParty = 0;
      for (const socialClass of socialClasses) {
        votesForPoliticalParty += socialClass.getVotesOfSocialClassForPoliticalParty(politicalParty);
      }
      votesForPoliticalPartyInElections.push(this.votesForPoliticalPartyInElectionFactory.createVotesForPoliticalPartyInElection(
        election,
        politicalParty,
        votesForPoliticalParty,
      ));
    }

    election.setVotesForPoliticalPartyInElection(votesForPoliticalPartyInElections);
    return votesForPoliticalPartyInElections;
  }
}
