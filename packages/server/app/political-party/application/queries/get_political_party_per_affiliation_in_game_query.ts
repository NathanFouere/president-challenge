import type { PoliticalAffiliation } from '@president-challenge/shared/dist/political-party/political-affiliation.js';

export default class GetPoliticalPartyPerAffiliationInGameQuery {
  constructor(
    public readonly gameId: number,
    public readonly politicalAffiliation: PoliticalAffiliation,
  ) {
  }
}
