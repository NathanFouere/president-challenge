import type Law from '#law/domain/model/law';

export default class GetIncompatibleLawsQuery {
  constructor(
    public readonly law: Law,
    public readonly gameId: number,
  ) {}
}
