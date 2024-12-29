import type Senate from '#legislature/domain/models/senate';
import type { GetSenateByGameQuery } from '#legislature/application/query/get_senate_by_game_query';

export default abstract class IGetSenateByGameQueryHandler {
  public abstract handle(getSenateByGameQuery: GetSenateByGameQuery): Promise<Senate>;
}
