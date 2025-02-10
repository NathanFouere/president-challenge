import { BaseCommand } from '@adonisjs/core/ace';
import { inject } from '@adonisjs/core';
import type { CommandOptions } from '@adonisjs/core/types/ace';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import LawEffectStartupService from '#law/infrastructure/startup/law_effect_startup_service';

export default class GenerateLawEffects extends BaseCommand {
  static readonly commandName = 'generate:law-effects';
  static readonly description = 'Generate law effects for the game';

  static readonly options: CommandOptions = {
    startApp: true,
  };

  @inject()
  async run(lawEffectStartupService: LawEffectStartupService) {
    await lawEffectStartupService.createLawEffects();
  }
}
