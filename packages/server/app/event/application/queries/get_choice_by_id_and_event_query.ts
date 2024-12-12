export class GetChoiceByIdAndEventQuery {
  public constructor(
    public readonly choiceId: number,
    public readonly eventId: number,
  ) {}
}
