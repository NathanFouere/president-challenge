import type { MinimalEventDto } from '../../../../shared/src/event/minimal-event-dto';

export const useEventsStore = defineStore('eventsStore', {
  state: () => ({
    choiceEvents: [] as MinimalEventDto[],
    historicalEvents: [] as MinimalEventDto[],
    superEvents: [] as MinimalEventDto[],
  }),
  getters: {
    getChoiceEvents(state): MinimalEventDto[] {
      return state.choiceEvents;
    },
    getHistoricalEvents(state): MinimalEventDto[] {
      return state.historicalEvents;
    },
    getSuperEvents(state): MinimalEventDto[] {
      return state.superEvents;
    },
  },
  actions: {
    setChoiceEvents(events: MinimalEventDto[]) {
      this.choiceEvents = [...events];
    },
    setHistoricalEvents(events: MinimalEventDto[]) {
      this.historicalEvents = [...events];
    },
    setSuperEvents(events: MinimalEventDto[]) {
      this.superEvents = [...events];
    },
  },
});
