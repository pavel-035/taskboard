import { EventHandler } from './eventHandler'

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

    this.mouseEnter = new EventHandler({
      eventType: 'mouseenter',
      element: columnElement,
      handler: (event, callback) => callback(event)
    })

    this.mouseLeave = new EventHandler({
      eventType: 'mouseleave',
      element: columnElement,
      handler: (event, callback) => callback(event)
    })

    this.focus = new EventHandler({
      eventType: 'columnFocus',
      element: columnElement,
      handler: (event, callback) => callback(event)
    })

    this.blur = new EventHandler({
      eventType: 'columnBlur',
      element: columnElement,
      handler: (event, callback) => callback(event)
    })

    this.init()
  }

  init () {
    this.mouseEnter.addListener(() => {
      const columnFocusEvent = new CustomEvent('columnFocus')

      this.columnElement.dispatchEvent(columnFocusEvent)
    })

    this.mouseLeave.addListener(() => {
      const columnFocusEvent = new CustomEvent('columnBlur')

      this.columnElement.dispatchEvent(columnFocusEvent)
    })
  }

  destroy () {
    this.mouseLeave.removeListener()
    this.mouseEnter.removeListener()
    this.focus.removeListener()
    this.blur.removeListener()
  }
}
