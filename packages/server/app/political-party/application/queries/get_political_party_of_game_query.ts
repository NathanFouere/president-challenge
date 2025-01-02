export default class GetPoliticalPartyOfGameQuery {
  constructor(
    public readonly gameId: number,
    public readonly politicalPartyId: number,
  ) {
  }
}
