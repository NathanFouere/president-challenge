import type { AdminJSProviderConfig } from '@adminjs/adonis';

import componentLoader from '../app/admin/component_loader.js';
import authProvider from '../app/admin/auth_admin.js';
import {
  createChoiceAdminResource,
  createChoiceDefinitionAdminResource,
  createEventAdminResource,
  createEventDefinitionAdminResource,
} from '#event/infrastructure/admin/event_admin_configuration';
import { createUsersAdminResource } from '#user/infrastructure/admin/user_admin_configuration';
import { createGameAdminResource } from '#game/infrastructure/admin/game_admin_configuration';
import {
  createBudgetAdminResource,
  createBudgetDefinitionAdminResource,
} from '#budget/infrastructure/admin/budget_admin_configuration';
import {
  createStateAdminResource,
  createStateDefinitionAdminResource,
} from '#state/infrastructure/admin/state_admin_configuration';
import {
  createTaxAdminResource,
  createTaxDefinitionAdminResource,
} from '#tax/infrastructure/admin/tax_admin_configuration';
import {
  createSocialClassAdminResource, createSocialClassChoiceHappinessEffectAdminResource,
  createSocialClassDefinitionAdminResource, createSocialClassLawHappinessEffectAdminResource,
} from '#social-class/infrastructure/admin/social_class_admin_configuration';
import {
  createSectorAdminResource,
  createSectorDefinitionAdminResource,
} from '#sector/infrastructure/admin/sector_admin_configuration';
import {
  createProductAdminResource,
  createProductDefinitionAdminResource,
} from '#product/infrastructure/admin/product_admin_configuration';
import {
  createPoliticalAffiliationChoiceHappinessEffectAdminResource,
  createPoliticalAffiliationLawHappinessEffectAdminResource,
  createPoliticalPartyAdminResource,
  createPoliticalPartyDefinitionAdminResource,
} from '#political-party/infrastructure/admin/political_party_admin_configuration';
import { createLicensedFileAdminResource } from '#licensed-file/infrastructure/admin/licensed_file_admin_configuration';
import {
  createLawAdminResource,
  createLawDefinitionAdminResource,
} from '#law/infrastructure/admin/law_admin_configuration';
import {
  createPoliticalPartyHappinessModifierAdminResource,
  createSocialClassHappinessModifierAdminResource,
} from '#happiness-modifier/infrastructure/admin/happiness_modifier_admin_configuration';
import {
  createParliamentAdminResource,
  createParliamentDefinitionAdminResource, createSenateAdminResource, createSenateDefinitionAdminResource,
} from '#legislature/infrastructure/admin/legislature_admin_configuration';

const adminjsConfig: AdminJSProviderConfig = {
  adapter: {
    enabled: true,
  },
  adminjs: {
    rootPath: '/admin',
    loginPath: '/admin/login',
    logoutPath: '/admin/logout',
    componentLoader,
    resources: [
      createUsersAdminResource(),
      createGameAdminResource(),
      createEventAdminResource(),
      createEventDefinitionAdminResource(),
      createBudgetDefinitionAdminResource(),
      createBudgetAdminResource(),
      createStateAdminResource(),
      createStateDefinitionAdminResource(),
      createTaxAdminResource(),
      createTaxDefinitionAdminResource(),
      createSocialClassAdminResource(),
      createSocialClassDefinitionAdminResource(),
      createSectorAdminResource(),
      createSectorDefinitionAdminResource(),
      createProductAdminResource(),
      createProductDefinitionAdminResource(),
      createPoliticalPartyDefinitionAdminResource(),
      createPoliticalPartyAdminResource(),
      createPoliticalAffiliationChoiceHappinessEffectAdminResource(),
      createSocialClassChoiceHappinessEffectAdminResource(),
      createSocialClassLawHappinessEffectAdminResource(),
      createPoliticalAffiliationLawHappinessEffectAdminResource(),
      createChoiceDefinitionAdminResource(),
      createChoiceAdminResource(),
      createLicensedFileAdminResource(),
      createLawDefinitionAdminResource(),
      createLawAdminResource(),
      createSocialClassHappinessModifierAdminResource(),
      createPoliticalPartyHappinessModifierAdminResource(),
      createLawDefinitionAdminResource(),
      createLawAdminResource(),
      createParliamentDefinitionAdminResource(),
      createParliamentAdminResource(),
      createSenateDefinitionAdminResource(),
      createSenateAdminResource(),
    ],
    pages: {},
    locale: {
      availableLanguages: ['en'],
      language: 'en',
      translations: {
        en: {
          actions: {},
          messages: {},
          labels: {},
          buttons: {},
          properties: {},
          components: {},
          pages: {},
          ExampleResource: {
            actions: {},
            messages: {},
            labels: {},
            buttons: {},
            properties: {},
          },
        },
      },
    },
    branding: {
      companyName: 'AdminJS',
      theme: {},
    },
    settings: {
      defaultPerPage: 10,
    },
  },
  auth: {
    enabled: true,
    provider: authProvider,
    middlewares: [],
  },
  middlewares: [],
};

export default adminjsConfig;
