import { Columns } from './column'
import { CardHandler, Cards, CardStyleManager } from './card'
import { Draggable } from './draggable'

export default class {
  constructor ({
    container,
    columnDataAttribute,
    cardDataAttribute,
    dropCallback
  }) {
    this.container = container
    this.columnDataAttribute = columnDataAttribute
    this.cardDataAttribute = cardDataAttribute
    this.dropCallback = dropCallback

    this.columns = null
    this.cards = null
    this.draggable = null
    this.handlers = []

    this.init()
  }

  init () {
    this.update()
    this.initHandlers()
  }

  update () {
    this.columns = new Columns({
      container: this.container,
      columnDataAttribute: this.columnDataAttribute
    })

    this.cards = new Cards({
      columns: this.columns,
      cardDataAttribute: this.cardDataAttribute
    })

    this.draggable = new Draggable({
      cards: this.cards
    })
  }

  destroy () {
    this.clearHandlers()

    this.columns.destroy()
    this.cards.destroy()
  }

  initHandlers () {
    const cardHandler = new CardHandler(this.container, this.cardDataAttribute)
    let targetCard

    cardHandler.mouseDown.addListener((event, target) => {
      this.draggable.launch(event, target)
      CardStyleManager.setTransparent(target)
      targetCard = target
    })
    cardHandler.mouseUp.addListener((event) => {
      const focusColumnId = this.columns.columnInFocus?.id
      const draggableCard = this.draggable.draggableCard

      if (focusColumnId && draggableCard) {
        this.dropCallback(draggableCard.id, focusColumnId)
      }

      CardStyleManager.dropTransparent(targetCard)
    })

    this.handlers.push(cardHandler)
  }

  clearHandlers () {
    this.handlers.forEach(handler => handler.destroy())

    this.handlers.splice(0, this.handlers.length)
  }
}
