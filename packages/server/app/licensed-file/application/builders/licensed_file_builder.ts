import LicensedFile from '#licensed-file/domain/models/licensed_file';

export class LicensedFileBuilder {
  public identifier: string | null = null;
  public title: string | null = null;
  public attribution: string | null = null;
  public source: string | null = null;
  public license: string | null = null;
  public date: string | null = null;
  public path: string | null = null;
  public isVideo: boolean | null = null;

  withIdentifier(identifier: string): this {
    this.identifier = identifier;
    return this;
  }

  withTitle(title: string): this {
    this.title = title;
    return this;
  }

  withAttribution(attribution: string): this {
    this.attribution = attribution;
    return this;
  }

  withSource(source: string): this {
    this.source = source;
    return this;
  }

  withLicense(license: string | null): this {
    this.license = license;
    return this;
  }

  withDate(date: string): this {
    this.date = date;
    return this;
  }

  withPath(path: string): this {
    this.path = path;
    return this;
  }

  withIsVideo(isVideo: boolean): this {
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

    if (this.title) {
      licensedFile.title = this.title;
    }
    else {
      throw new Error('LicensedFile title is required');
    }

    licensedFile.attribution = this.attribution;

    licensedFile.source = this.source;

    licensedFile.license = this.license;

    licensedFile.date = this.date;

    if (this.path) {
      licensedFile.key = this.path;
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
