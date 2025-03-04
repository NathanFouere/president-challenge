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
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetEventDefinitionByIdentifierQueryHandler
  from '#event/application/queries/i_get_event_definition_by_identifier_query_handler';
import { GetEventDefinitionByIdentifierQuery } from '#event/application/queries/get_event_definition_by_identifier_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IEventRepository from '#event/domain/repository/i_event_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import EventFactory from '#event/application/factory/event_factory';

@inject()
export class ElectionService {
  constructor(
    private readonly electionRepository: IElectionRepository,
    private readonly votesForPoliticalPartyInElectionRepository: IVotesForPoliticalPartyInElectionRepository,
    private readonly electionFactory: ElectionFactory,
    private readonly votesForPoliticalPartyInElectionFactory: VotesForPoliticalPartyInElectionFactory,
    private readonly getEventDefinitionByIdentifierQueryHandler: IGetEventDefinitionByIdentifierQueryHandler,
    private readonly eventFactory: EventFactory,
    private readonly eventRepository: IEventRepository,
  ) {
  }

  readonly parliamentoryElectionTurns = [2, 3, 4];
  readonly senateElectionTurns = [1, 5];
  readonly presidentialElectionTurns = [6, 10];
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
        election.id,
        politicalParty.id,
        votesForPoliticalParty,
      ));
    }

    await this.votesForPoliticalPartyInElectionRepository.createMany(votesForPoliticalPartyInElections);
    await this.generateEventFromElection(game, electionType);
  }

  private async generateEventFromElection(game: Game, electionType: ElectionType): Promise<void> {
    const eventDefinition = await this.getEventDefinitionByIdentifierQueryHandler.handle(new GetEventDefinitionByIdentifierQuery(
      electionType,
    ));

    const event = this.eventFactory.createEventFromElection(eventDefinition.id, game.id, game.turn);
    await this.eventRepository.save(event);
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
