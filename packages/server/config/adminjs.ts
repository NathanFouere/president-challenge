import type { AdminJSProviderConfig } from '@adminjs/adonis';
import { LucidResource } from '@adminjs/adonis';

import componentLoader from '../app/admin/component_loader.js';
import authProvider from '../app/admin/auth.js';
import User from '#user/domain/models/user';
import Budget from '#budget/domain/model/budget';
import Game from '#game/domain/models/game';
import PoliticalParty from '#political-party/domain/models/political_party';
import PoliticalPartyDefinition from '#political-party/domain/models/political_party_definition';
import Event from '#event/domain/models/event';
import EventDefinition from '#event/domain/models/event_definition';
import Law from '#law/domain/model/law';
import LawDefinition from '#law/domain/model/law_definition';
import SocialClassHappinessModifier from '#social-class/domain/models/social_class_happiness_modifier';
import PoliticalPartyHappinessModifier from '#political-party/domain/models/political_party_happiness_modifier';
import LicensedFile from '#licensed-file/domain/models/licensed_file';
import { Parliament } from '#legislature/domain/models/parliament';
import Senate from '#legislature/domain/models/senate';
import Product from '#product/domain/models/product';
import ProductDefinition from '#product/domain/models/product_definition';
import Sector from '#sector/domain/model/sector';
import SectorDefinition from '#sector/domain/model/sector_definition';
import SocialClassDefinition from '#social-class/domain/models/social_class_definition';
import SocialClass from '#social-class/domain/models/social_class';
import State from '#state/domain/model/state';
import StateDefinition from '#state/domain/model/state_definition';
import Tax from '#tax/domain/model/tax';
import TaxDefinition from '#tax/domain/model/tax_definition';

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
      new LucidResource(User, 'postgres'),
      new LucidResource(LicensedFile, 'postgres'),
      new LucidResource(Budget, 'postgres'),
      new LucidResource(Game, 'postgres'),
      new LucidResource(PoliticalParty, 'postgres'),
      new LucidResource(PoliticalPartyDefinition, 'postgres'),
      new LucidResource(Event, 'postgres'),
      new LucidResource(EventDefinition, 'postgres'),
      new LucidResource(Law, 'postgres'),
      new LucidResource(LawDefinition, 'postgres'),
      new LucidResource(SocialClassHappinessModifier, 'postgres'),
      new LucidResource(PoliticalPartyHappinessModifier, 'postgres'),
      new LucidResource(Parliament, 'postgres'),
      new LucidResource(Senate, 'postgres'),
      new LucidResource(Product, 'postgres'),
      new LucidResource(ProductDefinition, 'postgres'),
      new LucidResource(Sector, 'postgres'),
      new LucidResource(SectorDefinition, 'postgres'),
      new LucidResource(SocialClassDefinition, 'postgres'),
      new LucidResource(SocialClass, 'postgres'),
      new LucidResource(State, 'postgres'),
      new LucidResource(StateDefinition, 'postgres'),
      new LucidResource(Tax, 'postgres'),
      new LucidResource(TaxDefinition, 'postgres'),
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
