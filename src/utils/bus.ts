interface IEvent {
  eventName: string
  eventFn: eventFnType
}

interface IEvents {
  [eventName: string]: IEvent[]
}

type eventFnType = (option: any) => void

class Event {
  events: IEvents
  constructor() {
    this.events = {}
  }

  $on(eventName: string, eventFn: eventFnType) {
    let handlers = this.events[eventName]
    if (!handlers) {
      handlers = []
      this.events[eventName] = handlers
    }
    handlers.push({
      eventName,
      eventFn
    })
  }

  $off(eventName: string, callback: eventFnType) {
    const handlers = this.events[eventName]
    if (!handlers) return
    for (let i = 0; i < handlers.length; i++) {
      if (
        handlers[i].eventName === eventName &&
        handlers[i].eventFn === callback
      ) {
        handlers.splice(i, 1)
      }
    }
  }

  $emit(eventName: string, option: any) {
    const handlers = this.events[eventName]
    if (!handlers) return
    handlers.forEach((item) => {
      if (item.eventName === eventName) {
        item.eventFn(option)
      }
    })
  }
}

export default new Event()
