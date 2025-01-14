import { inject } from '@adonisjs/core';
import type Law from '#legislature/domain/models/law';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ILawRepository from '#legislature/domain/repository/i_law_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import GenerateVoteResultsService from '#legislature/application/service/generate_vote_results_service';
import { LegislatureType } from '#legislature/domain/models/legislature_type';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  IGetLegislatureVoteResultOfLawForElectionQueryHandler,
} from '#legislature/application/query/i_get_law_vote_result_of_law_for_election_query_handler';
import GetLawVoteResultOfLawForElectionQuery
  from '#legislature/application/query/get_law_vote_result_of_law_for_turn_query';

@inject()
export default class VoteLawService {
  constructor(
    private readonly lawRepository: ILawRepository,
    private readonly generateVoteResultsService: GenerateVoteResultsService,
    private readonly getLegislatureVoteResultOfLawForElectionQueryHandler: IGetLegislatureVoteResultOfLawForElectionQueryHandler,
  ) {
  }

  public async voteLaw(law: Law, turn: number): Promise<void> {
    if (law.voted) {
      throw new Error('Law already voted');
    }

    await this.generateVoteResultsService.generateVoteResults(law, turn, LegislatureType.SENATE);
    await this.generateVoteResultsService.generateVoteResults(law, turn, LegislatureType.PARLIAMENT);

    const lawVoteResultsSenate = await this.getLegislatureVoteResultOfLawForElectionQueryHandler.handle(new GetLawVoteResultOfLawForElectionQuery(
      law.id,
      turn,
      LegislatureType.SENATE,
    ));
    const lawVoteResultsParliament = await this.getLegislatureVoteResultOfLawForElectionQueryHandler.handle(new GetLawVoteResultOfLawForElectionQuery(
      law.id,
      turn,
      LegislatureType.PARLIAMENT,
    ));

    law.voted = lawVoteResultsSenate.votePasses() && lawVoteResultsParliament.votePasses();

    await this.lawRepository.save(law);
  }
}
