import { BaseCommand } from '@adonisjs/core/ace';
import { inject } from '@adonisjs/core';
import type { CommandOptions } from '@adonisjs/core/types/ace';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import LawDefinitionStartupService from '#law/infrastructure/startup/law_definition_startup_service';

export default class GenerateLaws extends BaseCommand {
  static readonly commandName = 'generate:laws';
  static readonly description = 'Generate laws';

  static readonly options: CommandOptions = {
    startApp: true,
  };

  @inject()
  async run(lawStartupService: LawDefinitionStartupService) {
    await lawStartupService.execute();
  }
}
