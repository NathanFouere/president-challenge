import type PoliticalParty from '#political-party/domain/models/political_party';

export default class PoliticalPartiesAverageHappinessCalculatorService {
  public calculateAverageHappiness(politicalParties: PoliticalParty[]): number {
    const totalHappiness = politicalParties.reduce((acc, politicalParty) => acc + politicalParty.getHappinessLevel(), 0);
    return totalHappiness / politicalParties.length;
  }
}
