import { Columns } from './column'
import { EventHandler } from './eventHandler'

export class Card {
  constructor ({
    columnId,
    rowId,
    id,
    nodeElement
  }) {
    this.columnId = columnId
    this.rowId = rowId
    this.id = id
    this.nodeElement = nodeElement
  }
}

export class CardHandler {
  constructor (container, cardDataAttribute) {
    this.mouseDown = new EventHandler({
      eventType: 'mousedown',
      element: container,
      handler: (event, callback) => {
        const target = event.target.closest(`[${cardDataAttribute}]`)

        if (target) callback(event, target)
      }
    })
    this.mouseUp = new EventHandler({
      eventType: 'mouseup',
      element: container,
      handler: (event, callback) => {
        callback(event)
      }
    })
  }

  destroy () {
    this.mouseDown.removeListener()
  }
}

export class Cards {
  constructor ({
    columns,
    cardDataAttribute
  }) {
    if (!(columns instanceof Columns)) { throw new Error('columns must implement Columns') }

    this.columns = columns.value
    this.cardDataAttribute = cardDataAttribute

    this.value = []
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
    this.columns.forEach(column => {
      const cardsNodeList = column.nodeElement.querySelectorAll(`[${this.cardDataAttribute}]`)

      cardsNodeList.forEach((cardNodeElement, index) => {
        const card = new Card({
          columnId: column.id,
          rowId: index,
          id: Number(cardNodeElement.getAttribute(this.cardDataAttribute)),
          nodeElement: cardNodeElement
        })

        this.value.push(card)
      })
    })
  }

  findCardByNodeElement (nodeElement) {
    const cardId = Number(nodeElement.getAttribute(this.cardDataAttribute))

    if (!cardId) return null
    return this.value.find(card => card.id === cardId)
  }
}

export class CardStyleManager {
  static setTransparent (nodeElement) {
    nodeElement.style.opacity = 0.5
  }

  static dropTransparent (nodeElement) {
    nodeElement.style.opacity = 1
  }
}
