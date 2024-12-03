import LicensedFile from '#licensed-file/domain/models/licensed_file';

export class LicensedFileBuilder {
  public identifier: string | null = null;
  public attribution: string | null = null;
  public source: string | null = null;
  public license: string | null = null;
  public date: string | null = null;
  public path: string | null = null;
  public isVideo: boolean | null = null;

  withIdentifier(identifier: string): LicensedFileBuilder {
    this.identifier = identifier;
    return this;
  }

  withAttribution(attribution: string): LicensedFileBuilder {
    this.attribution = attribution;
    return this;
  }

  withSource(source: string): LicensedFileBuilder {
    this.source = source;
    return this;
  }

  withLicense(license: string | null): LicensedFileBuilder {
    this.license = license;
    return this;
  }

  withDate(date: string): LicensedFileBuilder {
    this.date = date;
    return this;
  }

  withPath(path: string): LicensedFileBuilder {
    this.path = path;
    return this;
  }

  withIsVideo(isVideo: boolean): LicensedFileBuilder {
    this.isVideo = isVideo;
    return this;
  }

  build(): LicensedFile {
    const licensedFile = new LicensedFile();

    if (this.identifier) {
      licensedFile.identifier = this.identifier;
    }
    else {
      throw new Error('LicensedFile identifier is required');
    }

    licensedFile.attribution = this.attribution;

    licensedFile.source = this.source;

    licensedFile.license = this.license;

    licensedFile.date = this.date;

    if (this.path) {
      licensedFile.path = this.path;
    }
    else {
      throw new Error('LicensedFile path is required');
    }

    if (this.isVideo !== null) {
      licensedFile.isVideo = this.isVideo;
    }
    else {
      throw new Error('LicensedFile isVideo is required');
    }

    return licensedFile;
  }
}

export function aLicensedFile(): LicensedFileBuilder {
  return new LicensedFileBuilder();
}
