import type IPoliticalPartyHappinessPerTurnRepository
  from '#political-party/domain/repository/i_political_party_happiness_per_turn_repository';
import type PoliticalPartyHappinessPerTurn from '#political-party/domain/models/political_party_happiness_per_turn';

export default class PoliticalPartyHappinessPerTurnRepository implements IPoliticalPartyHappinessPerTurnRepository {
  public async save(politicalPartyHappinessPerTurn: PoliticalPartyHappinessPerTurn): Promise<void> {
    await politicalPartyHappinessPerTurn.save();
  }

  public async delete(politicalPartyHappinessPerTurn: PoliticalPartyHappinessPerTurn): Promise<void> {
    await politicalPartyHappinessPerTurn.delete();
  }
}
