export class GetEventDefinitionByIdentifierAndGameDefinitionQuery {
  constructor(
    public readonly eventIdentifier: string,
    public readonly gameDefinitionIdentifier: string,
  ) {
  }
}
