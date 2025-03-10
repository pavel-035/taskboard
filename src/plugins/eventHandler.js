export class EventHandler {
  constructor ({
    eventType,
    eventOptions,
    element,
    handler
  }) {
    this.eventType = eventType
    this.eventOptions = eventOptions
    this.element = element
    this.handler = handler

    this.callback = null
    this.boundHandler = this.handleEvent.bind(this)
  }

  handleEvent (event) {
    this.handler(event, this.callback)
  }

  addListener (callback) {
    this.callback = callback
    this.element.addEventListener(this.eventType, this.boundHandler, this.eventOptions)
  }

  removeListener () {
    this.callback = null
    this.element.removeEventListener(this.eventType, this.boundHandler, this.eventOptions)
  }
}
