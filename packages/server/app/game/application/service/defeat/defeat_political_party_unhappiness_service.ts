import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import PoliticalPartiesAverageHappinessCalculatorService
  from '#political-party/domain/service/political_parties_average_happiness_calculator_service';
import type PoliticalParty from '#political-party/domain/models/political_party';

@inject()
export default class DefeatPoliticalPartyUnhappinessService {
  constructor(
    private readonly partiesAverageHappinessCalculatorService: PoliticalPartiesAverageHappinessCalculatorService,
  ) {
  }

  public async checkDefeatPoliticalPartyUnhappiness(parties: PoliticalParty[]): Promise<boolean> {
    const averageHappiness = this.partiesAverageHappinessCalculatorService.calculateAverageHappiness(parties);

    return averageHappiness == 0;
  };
}
