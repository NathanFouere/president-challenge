import { BaseSchema } from '@adonisjs/lucid/schema';
import { SocialClassSubtypes } from '@president-challenge/shared/dist/social-class/social-class-subtypes.js';
import { SectorTypes } from '@president-challenge/shared/dist/sector/sector-types.js';

export default class extends BaseSchema {
  protected tableName = 'social_class_definitions';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('name').notNullable();
      table.text('description').notNullable();
      table.string('color').notNullable();
      table.integer('default_economical_situation').notNullable();
      table.enum('type',
        [
          'Business Owner',
          'Middle Class',
          'Working Class',
        ])
        .notNullable();
      // TODO => moove to sector_definition
      table.enum('sector_type',
        [
          SectorTypes.Service,
          SectorTypes.Industrial,
          SectorTypes.Agricultural,
          SectorTypes.Mine,
        ])
        .notNullable();
      table.enum('sub_type',
        [
          SocialClassSubtypes.IndustrialOwners,
          SocialClassSubtypes.MineOwners,
          SocialClassSubtypes.LandOwners,
          SocialClassSubtypes.IndustrialWorkers,
          SocialClassSubtypes.MiddleClass,
          SocialClassSubtypes.Peasantry,
          SocialClassSubtypes.Military,
          SocialClassSubtypes.Minors,
        ]).notNullable();

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').nullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
