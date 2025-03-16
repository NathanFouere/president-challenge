export interface LicensedFileDTO {
    identifier: string;
    title: string;
    attribution: string | null;
    source: string | null;
    license: string | null;
    date: string | null;
    url: string;
    isVideo: boolean;
}
