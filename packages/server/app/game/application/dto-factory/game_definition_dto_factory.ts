import { inject } from '@adonisjs/core';
import type { GameDefinitionDto } from '@president-challenge/shared/dist/game/game-definition-dto.js';
import type GameDefinition from '#game/domain/models/game_definition';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LicensedFileDTOFactory } from '#licensed-file/application/factory/licensed_file_dto_factory';

@inject()
export default class GameDefinitionDtoFactory {
  constructor(
    private readonly licensedFileDTOFactory: LicensedFileDTOFactory,
  ) {
  }

  public async createFromGameDefinition(gameDefinition: GameDefinition): Promise<GameDefinitionDto> {
    return {
      identifier: gameDefinition.identifier,
      name: gameDefinition.name,
      description: gameDefinition.description,
      logo: await this.licensedFileDTOFactory.createFromLicensedFile(gameDefinition.logo),
    };
  }

  public async createFromGameDefinitions(gameDefinitions: GameDefinition[]): Promise<GameDefinitionDto[]> {
    return Promise.all(gameDefinitions.map(gameDefinition => this.createFromGameDefinition(gameDefinition)));
  }
}
