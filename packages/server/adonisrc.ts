import { defineConfig } from '@adonisjs/core/app';

export default defineConfig({
  /*
  |--------------------------------------------------------------------------
  | Commands
  |--------------------------------------------------------------------------
  |
  | List of ace commands to register from packages. The application commands
  | will be scanned automatically from the "./commands" directory.
  |
  */
  commands: [() => import('@adonisjs/core/commands'), () => import('@adonisjs/lucid/commands')],

  /*
  |--------------------------------------------------------------------------
  | Service providers
  |--------------------------------------------------------------------------
  |
  | List of service providers to import and register when booting the
  | application
  |
  */
  providers: [
    () => import('@adonisjs/core/providers/app_provider'),
    () => import('@adonisjs/core/providers/hash_provider'),
    {
      file: () => import('@adonisjs/core/providers/repl_provider'),
      environment: ['repl', 'test'],
    },
    () => import('@adonisjs/core/providers/vinejs_provider'),
    () => import('@adonisjs/core/providers/edge_provider'),
    () => import('@adonisjs/session/session_provider'),
    () => import('@adonisjs/shield/shield_provider'),
    () => import('@adonisjs/static/static_provider'),
    () => import('@adonisjs/lucid/database_provider'),
    () => import('@adonisjs/auth/auth_provider'),
    () => import('@adonisjs/cors/cors_provider'),
    () => import('#event/event_provider'),
    () => import('#game/game_provider'),
    () => import('#legislature/legislature_provider'),
    () => import('#licensed-file/licensed_file_provider'),
    () => import('#political-party/political_party_provider'),
    () => import('#election/election_provider'),
    () => import('#product/product_provider'),
    () => import('#sector/sector_provider'),
    () => import('#social-class/social_class_provider'),
    () => import('#state/state_provider'),
    () => import('#tax/tax_provider'),
    () => import('#law/law_provider'),
    () => import('#budget/budget_provider'),
    () => import('#user/user_provider'),
    () => import('#happiness-modifier/happiness_modifier_provider'),
    {
      file: () => import('@adminjs/adonis/adminjs_provider'),
      environment: ['web'],
    },
    () => import('@adonisjs/drive/drive_provider'),
  ],

  /*
  |--------------------------------------------------------------------------
  | Preloads
  |--------------------------------------------------------------------------
  |
  | List of modules to import before starting the application.
  |
  */
  preloads: [
    () => import('#user/infrastructure/routes'),
    () => import('#state/infrastructure/routes'),
    () => import('#social-class/infrastructure/routes'),
    () => import('#sector/infrastructure/routes'),
    () => import('#product/infrastructure/routes'),
    () => import('#political-party/infrastructure/routes'),
    () => import('#legislature/infrastructure/routes'),
    () => import('#game/infrastructure/routes'),
    () => import('#event/infrastructure/routes'),
    () => import('#start/kernel'),
  ],

  /*
  |--------------------------------------------------------------------------
  | Tests
  |--------------------------------------------------------------------------
  |
  | List of test suites to organize tests by their type. Feel free to remove
  | and add additional suites.
  |
  */
  tests: {
    suites: [
      {
        files: ['tests/unit/**/*.spec(.ts|.js)'],
        name: 'unit',
        timeout: 2000,
      },
      {
        files: ['tests/functional/**/*.spec(.ts|.js)'],
        name: 'functional',
        timeout: 30000,
      },
    ],
    forceExit: false,
  },
  metaFiles: [
    '.env.test',
  ],

  assetsBundler: false,
});
