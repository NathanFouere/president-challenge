export default class GetPoliticalPartiesOfGameQuery {
  constructor(
    public readonly gameId: number,
    public readonly politicalPartyId: number,
  ) {
  }
}
