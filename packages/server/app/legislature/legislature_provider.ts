import AppProvider from '#common/provider';
import IGetSenateByGameQueryHandler from '#legislature/application/query/i_get_senate_by_game_query_handler';
import ISenateRepository from '#legislature/domain/repository/i_senate_repository';
import IParliamentRepository from '#legislature/domain/repository/i_parliament_repository';
import IPoliticalPartySeatsSenateRepository
  from '#legislature/domain/repository/i_politcal_party_seats_senate_repository';
import IPoliticalPartySeatsParliamentRepository
  from '#legislature/domain/repository/i_political_party_seats_parliament_repository';
import IGetParliamentByGameQueryHandler from '#legislature/application/query/i_get_parliament_by_game_query_handler';
import {
  IGetPoliticalPartyPerAffiliationInGameQueryHandler,
} from '#political-party/application/queries/i_get_political_party_per_affiliation_in_game_query_handler';
import {
  ILawVotesPercentagePerPoliticalPartyRepository,
} from '#law/domain/repository/i_law_votes_percentage_per_political_party_repository';
import {
  IPoliticalPartyVoteForLawRepository,
} from '#legislature/domain/repository/i_political_party_vote_for_law_repository';
import IPoliticalPartySeatsParliamentDefinitionRepository
  from '#legislature/domain/repository/i_political_party_seats_parliament_definition_repository';
import IPoliticalPartySeatsSenateDefinitionRepository
  from '#legislature/domain/repository/i_politcal_party_seats_senate_definition_repository';
import IGetSenateDefinitionByGameDefinitionQueryHandler from '#legislature/application/query/i_get_senate_definition_by_game_definition_query_handler';
import IGetParliamentDefinitionByGameDefinitionQueryHandler
  from '#legislature/application/query/i_get_parliament_definition_by_game_definition_query_handler';
import IGetPoliticalPartySeatsSenateDefinitionsByGameDefinitionQueryHandler
  from '#legislature/application/query/i_get_political_party_seats_senate_definitions_by_game_definition_query_handler';
import IGetPoliticalPartySeatsParliamentDefinitionsByGameDefinitionQueryHandler
  from '#legislature/application/query/i_get_political_party_seats_parliament_definitions_by_game_definition_query_handler';

export default class LegislatureProvider extends AppProvider {
  public async boot(): Promise<void> {
    const { default: GetSenateByGameQueryHandler } = await import(
      '#legislature/infrastructure/query/get_senate_by_game_query_handler'
    );
    const { default: GetParliamentByGameQueryHandler } = await import(
      '#legislature/infrastructure/query/get_parliament_by_game_query_handler'
    );
    const { default: SenateRepository } = await import(
      '#legislature/infrastructure/repositories/senate_repository'
    );
    const { default: ParliamentRepository } = await import(
      '#legislature/infrastructure/repositories/parliament_repository'
    );
    const { default: PoliticalPartySeatsParliamentRepository } = await import(
      '#legislature/infrastructure/repositories/political_party_seats_parliament_repository'
    );
    const { default: PoliticalPartySeatsSenateRepository } = await import(
      '#legislature/infrastructure/repositories/political_party_seats_senate_repository'
    );
    const { default: GetPoliticalPartyPerAffiliationInGameQueryHandler } = await import(
      '#political-party/infrastructure/query/get_political_party_per_affiliation_in_game_query_handler'
    );
    const { default: LawVotesPercentagePerPoliticalPartyRepository } = await import(
      '#law/infrastructure/repositories/law_votes_percentage_per_political_party_repository'
    );
    const { default: PoliticalPartyVoteForLawRepository } = await import(
      '#legislature/infrastructure/repositories/political_party_vote_for_law_repository'
    );
    const { default: PoliticalPartySeatsParliamentDefinitionRepository } = await import(
      '#legislature/infrastructure/repositories/political_party_seats_parliament_definition_repository'
    );

    const { default: PoliticalPartySeatsSenateDefinitionRepository } = await import(
      '#legislature/infrastructure/repositories/political_party_seats_senate_definition_repository'
    );

    const { default: GetSenateDefinitionByGameDefinitionQueryHandler } = await import(
      '#legislature/infrastructure/query/get_senate_definition_by_game_definition_query_handler'
    );

    const { default: GetParliamentDefinitionByGameDefinitionQueryHandler } = await import(
      '#legislature/infrastructure/query/get_parliament_definition_by_game_definition_query_handler'
    );

    const { default: GetPoliticalPartySeatsParliamentDefinitionsByGameDefinitionQueryHandler } = await import(
      '#legislature/infrastructure/query/get_political_party_seats_parliament_definitions_by_game_definition_query_handler'
    );

    const { default: GetPoliticalPartySeatsSenateDefinitionsByGameDefinitionQueryHandler } = await import(
      '#legislature/infrastructure/query/get_political_party_seats_senate_definitions_by_game_definition_query_handler'
    );

    this.app.container.bind(IGetPoliticalPartySeatsParliamentDefinitionsByGameDefinitionQueryHandler, () => {
      return new GetPoliticalPartySeatsParliamentDefinitionsByGameDefinitionQueryHandler();
    });

    this.app.container.bind(IGetPoliticalPartySeatsSenateDefinitionsByGameDefinitionQueryHandler, () => {
      return new GetPoliticalPartySeatsSenateDefinitionsByGameDefinitionQueryHandler();
    });

    this.app.container.bind(IGetSenateDefinitionByGameDefinitionQueryHandler, () => {
      return new GetSenateDefinitionByGameDefinitionQueryHandler();
    });

    this.app.container.bind(IGetParliamentDefinitionByGameDefinitionQueryHandler, () => {
      return new GetParliamentDefinitionByGameDefinitionQueryHandler();
    });

    this.app.container.bind(IPoliticalPartySeatsSenateDefinitionRepository, () => {
      return new PoliticalPartySeatsSenateDefinitionRepository();
    });
    this.app.container.bind(IPoliticalPartySeatsParliamentDefinitionRepository, () => {
      return new PoliticalPartySeatsParliamentDefinitionRepository();
    });

    this.app.container.bind(IGetSenateByGameQueryHandler, () => {
      return new GetSenateByGameQueryHandler();
    });
    this.app.container.bind(IGetParliamentByGameQueryHandler, () => {
      return new GetParliamentByGameQueryHandler();
    });
    this.app.container.bind(ISenateRepository, () => {
      return new SenateRepository();
    });
    this.app.container.bind(IParliamentRepository, () => {
      return new ParliamentRepository();
    });
    this.app.container.bind(IPoliticalPartySeatsParliamentRepository, () => {
      return new PoliticalPartySeatsParliamentRepository();
    });
    this.app.container.bind(IPoliticalPartySeatsSenateRepository, () => {
      return new PoliticalPartySeatsSenateRepository();
    });
    this.app.container.bind(IGetPoliticalPartyPerAffiliationInGameQueryHandler, () => {
      return new GetPoliticalPartyPerAffiliationInGameQueryHandler();
    });
    this.app.container.bind(ILawVotesPercentagePerPoliticalPartyRepository, () => {
      return new LawVotesPercentagePerPoliticalPartyRepository();
    });
    this.app.container.bind(IPoliticalPartyVoteForLawRepository, () => {
      return new PoliticalPartyVoteForLawRepository();
    });
  }
}
