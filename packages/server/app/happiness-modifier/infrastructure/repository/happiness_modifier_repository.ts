import { inject } from '@adonisjs/core';
import type IHappinessModifierRepository from '#happiness-modifier/domain/repository/i_happiness_modifier_repository';
import type HappinessModifier from '#happiness-modifier/domain/model/happiness_modifier';

@inject()
export default class HappinessModifierRepository implements IHappinessModifierRepository {
  public async delete(happinessModifier: HappinessModifier): Promise<void> {
    await happinessModifier.delete();
  }

  public async deleteMany(happinessModifiers: HappinessModifier[]): Promise<void> {
    await Promise.all(happinessModifiers.map(happinessModifier => happinessModifier.delete()));
  }

  public async save(happinessModifier: HappinessModifier): Promise<void> {
    await happinessModifier.save();
  }

  public async saveMany(happinessModifiers: HappinessModifier[]): Promise<void> {
    await Promise.all(happinessModifiers.map(happinessModifier => happinessModifier.save()));
  }
}
