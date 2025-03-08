import Event from '#event/domain/models/event';
import type { GetEventByIdAndGameQuery } from '#event/application/queries/get_event_by_id_and_game_query';
import type IGetEventByIdAndGameQueryHandler from '#event/application/queries/i_get_event_by_id_and_game_query_handler';

export default class GetEventByIdAndGameQueryHandler implements IGetEventByIdAndGameQueryHandler {
  public async handle(query: GetEventByIdAndGameQuery): Promise<Event> {
    const event = await Event
      .query()
      .where('id', query.eventId)
      .where('game_id', query.gameId)
      .preload('definition', (query) => {
        query.preload('licensedFiles');
      })
      .preload('choices', (query) => {
        query.preload('definition');
        query.orderBy('id', 'asc');
      })
      .firstOrFail();

    if (event.electionId) {
      await event.load('election', (electionQuery) => {
        electionQuery.preload('votesForPoliticalPartyInElection', (votesForPoliticalPartyInElectionQuery) => {
          votesForPoliticalPartyInElectionQuery.preload('politicalParty', (politicalPartyQuery) => {
            politicalPartyQuery.preload('definition');
          }).orderBy('id', 'desc');
        });
      });
    }

    return event;
  }
}
