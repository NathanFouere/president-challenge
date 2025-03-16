export default class FileDoesntExistError extends Error {
  constructor(
    public readonly key: string,
  ) {
    super(`File with key ${key} doesn't exist in s3`);
  }
}
