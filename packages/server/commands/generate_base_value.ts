import { BaseCommand } from '@adonisjs/core/ace';
import { inject } from '@adonisjs/core';
import type { CommandOptions } from '@adonisjs/core/types/ace';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import LawDefinitionStartupService from '#law/infrastructure/startup/law_definition_startup_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LicensedFileCreationService } from '#licensed-file/infrastructure/startup/licensed_file_creation_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { EventDefinitionStartupService } from '#event/infrastructure/startup/event_definition_startup_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { SocialClassDefinitionStartupService } from '#social-class/infrastructure/startup/social_class_definition_startup_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { SectorDefinitionStartupService } from '#sector/infrastructure/startup/sector_definition_startup_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ProductDefinitionStartupService } from '#product/infrastructure/startup/product_definition_startup_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import BudgetDefinitionStartupService from '#budget/infrastructure/startup/budget_definition_startup_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { TaxDefinitionStartupService } from '#tax/infrastructure/startup/tax_definition_startup_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { StateDefinitionStartupService } from '#state/infrastructure/startup/state_definition_startup_service';

export default class GenerateBaseValue extends BaseCommand {
  static readonly commandName = 'generate:base';
  static readonly description = 'Generate base values';

  static readonly options: CommandOptions = {
    startApp: true,
  };

  @inject()
  async run(
    licensedFileCreationService: LicensedFileCreationService,
    lawStartupService: LawDefinitionStartupService,
    eventStartupService: EventDefinitionStartupService,
    socialClassDefinitionStartupService: SocialClassDefinitionStartupService,
    sectorDefinitionStartupService: SectorDefinitionStartupService,
    productDefinitionStartupService: ProductDefinitionStartupService,
    bugdetDefinitionStartupService: BudgetDefinitionStartupService,
    taxDefinitionStartupService: TaxDefinitionStartupService,
    stateDefinitionStartupService: StateDefinitionStartupService,
  ) {
    await licensedFileCreationService.initializeLicensedFiles();
    await socialClassDefinitionStartupService.execute();
    await lawStartupService.execute();
    await eventStartupService.execute();
    await sectorDefinitionStartupService.execute();
    await productDefinitionStartupService.execute();
    await stateDefinitionStartupService.execute();
    await bugdetDefinitionStartupService.execute();
    await taxDefinitionStartupService.execute();
  }
}
