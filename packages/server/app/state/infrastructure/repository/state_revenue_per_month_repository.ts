import StateRevenuePerMonth from '#state/domain/model/state_revenue_per_month';

export class StateRevenuePerMonthRepository {
  public async save(state: StateRevenuePerMonth): Promise<void> {
    state.save();
  }

  public async saveMany(states: StateRevenuePerMonth[]): Promise<void> {
    states.forEach(state => state.save());
  }

  public async findById(id: number): Promise<StateRevenuePerMonth | null> {
    return StateRevenuePerMonth.find(id);
  }

  public async getById(id: number): Promise<StateRevenuePerMonth> {
    return await StateRevenuePerMonth.findOrFail(id);
  }
}
