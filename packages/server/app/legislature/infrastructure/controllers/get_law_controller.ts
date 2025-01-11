import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

import { LawType } from '@shared/dist/legislature/law-type.js';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetPropertyLawByIdAndGameQueryHandler from '#legislature/application/query/i_get_property_law_by_id_and_game_query_handler';
import { GetPropertyLawByIdAndGameQuery } from '#legislature/application/query/get_property_law_by_id_and_game_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import LawDtoFactory from '#legislature/application/dto-factories/law_dto_factory';
import type PropertyLaw from '#legislature/domain/models/property_law';

@inject()
export default class GetLawController {
  constructor(
    private readonly getPropertyLawByIdAndGameQueryHandler: IGetPropertyLawByIdAndGameQueryHandler,
    private readonly lawDtoFactory: LawDtoFactory,
  ) {
  }

  public async getLaw({ auth, params, response }: HttpContext) {
    try {
      auth.getUserOrFail();
      const gameId: number = params.gameId;
      const lawId: number = params.lawId;
      const lawType: string = params.lawType as LawType;

      let law: PropertyLaw | null = null;
      switch (lawType) {
        case LawType.PROPERTY:
          law = await this.getPropertyLawByIdAndGameQueryHandler.handle(new GetPropertyLawByIdAndGameQuery(
            gameId,
            lawId,
          ));
          break;
        default:
          throw new Error('Invalid law type');
      }

      return this.lawDtoFactory.createFromLaw(law, lawType);
    }
    catch (e) {
      return response.internalServerError({
        message: 'Something went wrong',
        error: e,
      });
    }
  }
}
