import { EventHandler } from '@/plugins/eventHandler'

export class Column {
  constructor ({
    id,
    nodeElement
  }) {
    this.id = id
    this.nodeElement = nodeElement
  }
}

export class ColumnEventHandler {
  constructor (columnElement) {
    this.columnElement = columnElement

    this.mouseMove = new EventHandler({
      eventType: 'pointermove',
      element: columnElement,
      handler: (event, callback) => callback(event)
    })

    this.mouseDown = new EventHandler({
      eventType: 'pointerdown',
      element: columnElement,
      handler: (event, callback) => callback(event)
    })

    this.mouseUp = new EventHandler({
      eventType: 'pointerup',
      element: columnElement,
      handler: (event, callback) => callback(event)
    })

    this.mouseEnter = new EventHandler({
      eventType: 'pointerenter',
      element: columnElement,
      handler: (event, callback) => callback(event)
    })

    this.mouseLeave = new EventHandler({
      eventType: 'pointerleave',
      element: columnElement,
      handler: (event, callback) => callback(event)
    })
  }

  destroy () {
    this.mouseLeave.removeListener()
    this.mouseEnter.removeListener()
    this.mouseDown.removeListener()
    this.mouseUp.removeListener()
  }
}
