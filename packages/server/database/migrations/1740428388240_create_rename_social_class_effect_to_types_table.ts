import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  public async up() {
    this.schema.renameTable(
      'social_class_choice_happiness_effects',
      'social_class_type_choice_happiness_effects',
    );
    this.schema.renameTable(
      'social_class_law_happiness_effects',
      'social_class_type_law_happiness_effects',
    );
  }

  public async down() {
    this.schema.renameTable(
      'social_class_type_choice_happiness_effects',
      'social_class_choice_happiness_effects',
    );
    this.schema.renameTable(
      'social_class_type_law_happiness_effects',
      'social_class_law_happiness_effects',
    );
  }
}
