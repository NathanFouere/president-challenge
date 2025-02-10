import type ILawEffectRepository from '#law/domain/repository/i_law_effect_repository';
import LawEffect from '#law/domain/model/law-effect/law_effect';

export default class LawEffectRepository implements ILawEffectRepository {
  public async findByIdentifier(identifier: string): Promise<LawEffect | null> {
    return await LawEffect.findBy('identifier', identifier);
  }

  public async getByIdentifier(identifier: string): Promise<LawEffect> {
    const lawEffect = await this.findByIdentifier(identifier);

    if (lawEffect === null) {
      throw new Error(`LawEffect with identifier ${identifier} not found`);
    }

    return lawEffect;
  }

  public async saveOrUpdateAll(lawEffects: LawEffect[]): Promise<void> {
    for (const lawEffect of lawEffects) {
      const existingEffect = await this.findByIdentifier(lawEffect.identifier);

      if (existingEffect) {
        existingEffect.merge(lawEffect.$attributes);
        await existingEffect.save();
      }
      else {
        await lawEffect.save();
      }
    }
  }
}
