import AppProvider from '#common/provider';
import IVotesForPoliticalPartyInElectionRepository
  from '#election/domain/repository/i_votes_for_political_party_in_election_repository';
import IElectionRepository from '#election/domain/repository/i_election_repository';

export default class ElectionProvider extends AppProvider {
  public async boot(): Promise<void> {
    const { default: VotesForPoliticalPartyInElectionRepository } = await import(
      '#election/infrastructure/repository/votes_for_political_party_in_election_repository'
    );
    const { default: ElectionRepository } = await import(
      '#election/infrastructure/repository/election_repository'
    );

    this.app.container.bind(IVotesForPoliticalPartyInElectionRepository, () => {
      return new VotesForPoliticalPartyInElectionRepository();
    });
    this.app.container.bind(IElectionRepository, () => {
      return new ElectionRepository();
    });
  }
}
