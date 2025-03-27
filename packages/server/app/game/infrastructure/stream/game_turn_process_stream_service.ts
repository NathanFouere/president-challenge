import * as console from 'node:console';
import { inject } from '@adonisjs/core';
import transmit from '@adonisjs/transmit/services/main';
import type { GameTurnProcessStreamData } from '@president-challenge/shared/dist/game/game-turn-process-stream-data.js';

@inject()
export default class GameTurnProcessStreamService {
  private channelsBroadcasted = new Map<string, NodeJS.Timeout>();
  private readonly interval: number = 1;
  public createGameTurnProcessStream(gameId: number, gameTurnProcessStreamContainer: GameTurnProcessStreamData): void {
    try {
      const channelName = `game-turn-process-${gameId}`;

      const interval = setInterval(() => {
        transmit.broadcast(channelName, {
          type: 'connection',
          message: gameTurnProcessStreamContainer.message,
          timestamp: new Date().toISOString(),
        });
      }, this.interval);

      this.channelsBroadcasted.set(channelName, interval);
    }
    catch (error) {
      console.error(error);
    }
  }

  public deleteGameTurnProcessStream(gameId: number): void {
    try {
      const channelName = `game-turn-process-${gameId}`;
      const interval = this.channelsBroadcasted.get(channelName);
      if (interval) {
        clearInterval(interval);
        this.channelsBroadcasted.delete(channelName);
      }
    }
    catch (error) {
      console.error(error);
    }
  }
}
