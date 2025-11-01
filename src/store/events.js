import { defineStore } from 'pinia'
import { events as mockEvents } from '../mock/data'

export const useEventsStore = defineStore('events', {
  state: () => ({ events: mockEvents }),
  actions: {
    addEvent(e) { this.events.push(e) }
  }
})
