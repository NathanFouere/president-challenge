import { targetRelationSettingsFeature } from '@adminjs/relations';
import { LucidResource } from '@adminjs/adonis';
import LicensedFile from '#licensed-file/domain/models/licensed_file';

export const createLicensedFileAdminResource = () => ({
  resource: new LucidResource(LicensedFile, 'postgres'),
  features: [targetRelationSettingsFeature()],
});
