export interface LicensedFileDTO {
  identifier: string;
  title: string;
  attribution: string | null;
  source: string | null;
  license: string | null;
  date: string | null;
  path: string;
  isVideo: boolean;
}
