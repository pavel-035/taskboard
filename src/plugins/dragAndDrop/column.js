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

export class ColumnHandler {
  constructor (columnElement) {
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
  }
}

export class Columns {
  constructor ({
    container,
    columnDataAttribute
  }) {
    this.container = container
    this.columnDataAttribute = columnDataAttribute

    this.value = []
    this.columnInFocus = null
    this.init()
  }

  init () {
    this.update()
  }

  update () {
    this.value.splice(0, this.value.length)

    this.fetch()
  }

  destroy () {
    this.value.splice(0, this.value.length)
  }

  fetch () {
    const columnsNodeList = this.container.querySelectorAll(`[${this.columnDataAttribute}]`)

    columnsNodeList.forEach((columnNodeElement) => {
      const column = new Column({
        id: Number(columnNodeElement.getAttribute(this.columnDataAttribute)),
        nodeElement: columnNodeElement
      })

      this.addFocusHandler(column)

      this.value.push(column)
    })
  }

  addFocusHandler (column) {
    const handler = new ColumnHandler(column.nodeElement)

    handler.mouseEnter.addListener(() => { this.columnInFocus = column })
    handler.mouseLeave.addListener(() => { this.columnInFocus = null })
  }
}
