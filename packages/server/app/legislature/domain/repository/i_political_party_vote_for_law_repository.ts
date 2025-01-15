import type PoliticalPartyVoteForLaw from '#legislature/domain/models/political_party_vote_for_law';

export abstract class IPoliticalPartyVoteForLawRepository {
  abstract save(legislaturePoliticalPartyVote: PoliticalPartyVoteForLaw): Promise<void>;
  abstract createMany(legislaturePoliticalPartyVotes: PoliticalPartyVoteForLaw[]): Promise<void>;
}
