import type {
  PropertyLawStartupInterface,
} from '#legislature/infrastructure/startup/startup-interface/property_law_startup_interface';

export interface LawGroupStartupInterface {
  type: string;
  name: string;
  description: string;
  propertyLaws: PropertyLawStartupInterface[];
}
