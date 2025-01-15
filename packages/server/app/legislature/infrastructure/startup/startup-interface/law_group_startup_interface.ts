import type {
  LawStartupInterface,
} from '#legislature/infrastructure/startup/startup-interface/law_startup_interface';

export interface LawGroupStartupInterface {
  type: string;
  name: string;
  description: string;
  laws: LawStartupInterface[];
}
