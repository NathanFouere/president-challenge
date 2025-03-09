import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IVotesForPoliticalPartyInElectionRepository
  from '#election/domain/repository/i_votes_for_political_party_in_election_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IElectionRepository from '#election/domain/repository/i_election_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ElectionFactory from '#election/application/factory/election_factory';
import type Game from '#game/domain/models/game';
import { ElectionType } from '#election/domain/model/election_type';
import type PoliticalParty from '#political-party/domain/models/political_party';
import type SocialClass from '#social-class/domain/models/social_class';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import VotesForPoliticalPartyInElectionFactory
  from '#election/application/factory/votes_for_political_party_in_election_factory';
import type Election from '#election/domain/model/election';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetParliamentByGameQueryHandler from '#legislature/application/query/i_get_parliament_by_game_query_handler';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetSenateByGameQueryHandler from '#legislature/application/query/i_get_senate_by_game_query_handler';
import { GetParliamentByGameQuery } from '#legislature/application/query/get_parliament_by_game_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IPoliticalPartySeatsParliamentRepository
  from '#legislature/domain/repository/i_political_party_seats_parliament_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IPoliticalPartySeatsSenateRepository
  from '#legislature/domain/repository/i_politcal_party_seats_senate_repository';
import { GetSenateByGameQuery } from '#legislature/application/query/get_senate_by_game_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import EventGenerationService from '#event/application/service/event_generation_service';

@inject()
export class ElectionService {
  constructor(
    private readonly electionRepository: IElectionRepository,
    private readonly votesForPoliticalPartyInElectionRepository: IVotesForPoliticalPartyInElectionRepository,
    private readonly electionFactory: ElectionFactory,
    private readonly votesForPoliticalPartyInElectionFactory: VotesForPoliticalPartyInElectionFactory,
    private readonly eventGenerationService: EventGenerationService,
    private readonly getParliamentByGameQueryHandler: IGetParliamentByGameQueryHandler,
    private readonly getSenateByGameQueryHandler: IGetSenateByGameQueryHandler,
    private readonly politicalPartySeatsParliamentRepository: IPoliticalPartySeatsParliamentRepository,
    private readonly politicalPartySeatsSenateRepository: IPoliticalPartySeatsSenateRepository,
  ) {
  }

  // TODO => cela devrait être dans la configuration du jeu
  readonly parliamentoryElectionTurns = [2, 3, 4];
  readonly senateElectionTurns = [6, 5];
  readonly presidentialElectionTurns = [1, 10];
  readonly electionTurns = [
    ...this.parliamentoryElectionTurns,
    ...this.senateElectionTurns,
    ...this.presidentialElectionTurns,
  ];

  public async processElection(game: Game, politicalParties: PoliticalParty[], socialClasses: SocialClass[]): Promise<void> {
    const electionType = this.getElectionTypeForTurn(game.turn);
    const election = this.electionFactory.createElectionForGame(game, electionType);
    await this.electionRepository.save(election);

    const votesForPoliticalPartyInElections = [];

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

    await this.votesForPoliticalPartyInElectionRepository.createMany(votesForPoliticalPartyInElections);
    election.setVotesForPoliticalPartyInElection(votesForPoliticalPartyInElections);
    await Promise.all([
      this.eventGenerationService.generateEventFromElection(game, election),
      this.applyElectionEffects(game, election),
    ]);
    await this.electionRepository.save(election);
  }

  private async applyElectionEffects(game: Game, election: Election): Promise<void> {
    switch (election.type) {
      case ElectionType.PARLIAMENTARY: {
        const parliament = await this.getParliamentByGameQueryHandler.handle(new GetParliamentByGameQuery(game.id));
        parliament.applyElectionEffects(election);
        await this.politicalPartySeatsParliamentRepository.saveMany(parliament.partySeats);
        break;
      }
      case ElectionType.SENATORIAL: {
        const senate = await this.getSenateByGameQueryHandler.handle(new GetSenateByGameQuery(game.id));
        senate.applyElectionEffects(election);
        await this.politicalPartySeatsSenateRepository.saveMany(senate.partySeats);
        break;
      }
    }
  }

  private getElectionTypeForTurn(turn: number): ElectionType {
    if (this.parliamentoryElectionTurns.includes(turn)) {
      return ElectionType.PARLIAMENTARY;
    }
    else if (this.senateElectionTurns.includes(turn)) {
      return ElectionType.SENATORIAL;
    }
    else if (this.presidentialElectionTurns.includes(turn)) {
      return ElectionType.PRESIDENTIAL;
    }

    throw new Error(`No election for turn ${turn}`);
  }

  public hasElectionForTurn(turn: number): boolean {
    return this.electionTurns.includes(turn);
  }
}
