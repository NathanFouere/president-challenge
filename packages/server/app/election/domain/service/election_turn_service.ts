import { inject } from '@adonisjs/core';
import { ElectionType } from '#election/domain/model/election_type';

@inject()
export default class ElectionTurnService {
  // TODO => cela devrait être dans la configuration du jeu
  readonly parliamentoryElectionTurns = [2, 3, 4];
  readonly senateElectionTurns = [6, 5];
  readonly presidentialElectionTurns = [1, 10];
  readonly electionTurns = [
    ...this.parliamentoryElectionTurns,
    ...this.senateElectionTurns,
    ...this.presidentialElectionTurns,
  ];

  public hasElectionForTurn(turn: number): boolean {
    return this.electionTurns.includes(turn);
  }

  public getElectionTypeForTurn(turn: number): ElectionType {
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
}
