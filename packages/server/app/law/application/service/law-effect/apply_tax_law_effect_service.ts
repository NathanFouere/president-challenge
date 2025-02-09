import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ITaxRepository from '#tax/domain/repository/i_tax_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetTaxByGameAndTypeQueryHandler from '#tax/application/query/i_get_tax_by_game_and_type_query_handler';
import GetTaxByGameAndTypeQuery from '#tax/application/query/get_tax_by_game_and_type_query';
import type LawEffect from '#law/domain/model/law-effect/law_effect';

@inject()
export default class ApplyTaxLawEffectService {
  constructor(
    private readonly taxRepository: ITaxRepository,
    private readonly getTaxByGameAndTypeQueryHandler: IGetTaxByGameAndTypeQueryHandler,
  ) {
  }

  public async apply(lawEffect: LawEffect, gameId: number): Promise<void> {
    const tax = await this.getTaxByGameAndTypeQueryHandler.handle(
      new GetTaxByGameAndTypeQuery(gameId, lawEffect.taxTypeToChange!),
    );

    tax.level = lawEffect.taxLevelToChange!;

    await this.taxRepository.save(tax);
  }
}
