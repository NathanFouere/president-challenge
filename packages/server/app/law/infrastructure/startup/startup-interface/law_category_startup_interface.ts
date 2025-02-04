import type {
  LawGroupStartupInterface,
} from '#law/infrastructure/startup/startup-interface/law_group_startup_interface';

export default interface LawCategoryStartupInterface {
  name: string;
  description: string;
  lawGroups: LawGroupStartupInterface[];
}
