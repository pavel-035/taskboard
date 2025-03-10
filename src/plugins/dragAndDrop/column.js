import { EventHandler } from '@/plugins/eventHandler'
import { ScrollOnHover, ScrollActivator } from '@/plugins/scroll/scrollOnHover'

export class Column {
  constructor ({
    id,
    nodeElement
  }) {
    this.id = id
    this.nodeElement = nodeElement
  }
}

export class ColumnHoverScroller {
  constructor (column, scrollDataAttribute) {
    if (!(column instanceof Column)) throw new Error('column must be a Column')
    this.column = column
    this.scrollDataAttribute = scrollDataAttribute

    this.scroller = null
  }

  init () {
    const container = this.column.nodeElement.querySelector(`[${this.scrollDataAttribute}]`)

    this.scroller = new ScrollOnHover({
      container,
      maxScrollSpeed: 5
    })

    const scrollTopActivator = new ScrollActivator({
      rect: {
        top: 0,
        right: container.clientWidth,
        bottom: container.clientHeight / 4,
        left: 0
      },
      scrollTo: 'top'
    })
    this.scroller.add(scrollTopActivator)

    const scrollBottomActivator = new ScrollActivator({
      rect: {
        top: container.clientHeight - container.clientHeight / 4,
        right: container.clientWidth,
        bottom: container.clientHeight,
        left: 0
      },
      scrollTo: 'bottom'
    })
    this.scroller.add(scrollBottomActivator)

    this.scroller.init()
  }

  destroy () {
    if (this.scroller) this.scroller.destroy()
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
