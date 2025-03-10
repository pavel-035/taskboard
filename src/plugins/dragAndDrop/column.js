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
  constructor (column) {
    if (!(column instanceof Column)) throw new Error('column must be a Column')
    this.column = column

    this.scroller = null
  }

  init () {
    const container = this.column.nodeElement.querySelector('[data-draggable-column-scroll]')

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
    this.scroller.destroy()
  }
}

export class ColumnEventHandler {
  constructor (columnElement) {
    this.columnElement = columnElement

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
