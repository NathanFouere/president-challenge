import type { MinimalEventDto } from '@president-challenge/shared/dist/event/minimal-event-dto';

export const useEventsStore = defineStore('eventsStore', {
  state: () => ({
    choiceEvents: [] as MinimalEventDto[],
    historicalEvents: [] as MinimalEventDto[],
    superEvents: [] as MinimalEventDto[],
    gettingEvents: false,
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
    isGettingEvents(state): boolean {
      return state.gettingEvents;
    },
  },
  actions: {
    setChoiceEvents(events: MinimalEventDto[]) {
      this.choiceEvents = events;
    },
    setHistoricalEvents(events: MinimalEventDto[]) {
      this.historicalEvents = events;
    },
    setSuperEvents(events: MinimalEventDto[]) {
      this.superEvents = events;
    },
    setGettingEvents() {
      this.gettingEvents = true;
    },
    unsetGettingEvents() {
      this.gettingEvents = false;
    },
  },
});
