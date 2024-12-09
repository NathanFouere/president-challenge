import type { MinimalEventDto } from '../../../../shared/src/event/minimal-event-dto';

export const useEventsStore = defineStore('eventsStore', {
  state: () => ({
    events: [] as MinimalEventDto[],
    gettingEvents: false,
    errorOnGettingEvents: false,
  }),
  getters: {
    getEvents(state): MinimalEventDto[] {
      return state.events;
    },
    isGettingEvents(state): boolean {
      return state.gettingEvents;
    },
    hasErrorOnGettingEvents(state): boolean {
      return state.errorOnGettingEvents;
    },
  },
  actions: {
    setEvents(events: MinimalEventDto[]) {
      this.events = [...events];
    },
    setGettingEvents() {
      this.gettingEvents = true;
    },
    unsetGettingEvents() {
      this.gettingEvents = false;
    },
    setErrorOnGettingEvents() {
      this.errorOnGettingEvents = true;
    },
  },
});
