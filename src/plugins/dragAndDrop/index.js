import { CardEventHandlers } from './card'
import { DOMManager } from './DOMManager'
import { DraggableComponent } from './draggable'
import { ColumnEventHandler } from './column'

export default class {
  constructor ({
    container,
    columnDataAttribute,
    cardDataAttribute,
    onDrop
  }) {
    this.container = container
    this.columnDataAttribute = columnDataAttribute
    this.cardDataAttribute = cardDataAttribute
    this.onDropCallback = onDrop

    this.DOMManager = null
    this.colums = []
    this.cards = []
    this.eventHandlers = []
    this.editCard = null
    this.focusColumnId = null
    this.focusRowId = null

    this.init()
    this.update()
  }

  init () {
    this.DOMManager = new DOMManager({
      container: this.container,
      cardDataAttribute: this.cardDataAttribute,
      columnDataAttribute: this.columnDataAttribute
    })
  }

  update () {
    this.clearEventHandlers()

    this.colums = this.DOMManager.fetchColumns()
    this.cards = this.DOMManager.fetchCards()

    this.initEventHandlers()
  }

  destroy () {
    this.colums.splice(0, this.colums.length)
    this.cards.splice(0, this.cards.length)

    this.clearEventHandlers()
  }

  initEventHandlers () {
    this.colums.forEach(column => {
      const columnEventHandler = new ColumnEventHandler(column.nodeElement)

      columnEventHandler.focus.addListener(() => { this.focusColumnId = column.id })
      columnEventHandler.blur.addListener(() => { this.focusColumnId = null })

      this.eventHandlers.push(columnEventHandler)
    })

    const cardEventHandlers = new CardEventHandlers(this.container, this.cardDataAttribute)

    cardEventHandlers.mouseDown.addListener((event, target) => {
      this.onMouseDown(event, target)

      cardEventHandlers.mouseUp.addListener(() => {
        this.onMouseUp()
      })
      cardEventHandlers.mouseMove.addListener((event, target, mouseOffset) => {
        this.onMouseMove(event, target, mouseOffset)
      })
    })

    this.eventHandlers.push(cardEventHandlers)
  }

  clearEventHandlers () {
    this.eventHandlers.forEach(handler => handler.destroy())

    this.eventHandlers.splice(0, this.eventHandlers.length)
  }

  onMouseDown (event, target) {
    this.editCard = DOMManager.findCardByNodeElement(this.cards, target, this.cardDataAttribute)

    const draggableComponent = new DraggableComponent({
      card: this.editCard
    })

    draggableComponent.init(event)
    this.editCard.isDisable(true)
  }

  onMouseUp () {
    const focusColumnId = this.focusColumnId
    const editCardId = this.editCard.id

    if (focusColumnId && editCardId) {
      this.onDropCallback(editCardId, focusColumnId, this.focusRowId)
    }

    this.editCard.isDisable(false)
    DOMManager.observeDOMChanges(this.container, () => this.update())
  }

  onMouseMove (event, target, mouseOffset) {
    this.focusRowId = this.calculateTargetRowId(target, mouseOffset)
  }

  calculateTargetRowId (target, mouseOffset) {
    if (target) {
      const cardHover = DOMManager.findCardByNodeElement(this.cards, target, this.cardDataAttribute)

      switch (mouseOffset) {
        case 'top': {
          return Math.max(cardHover.rowId - 1, 0)
        }
        case 'bottom': {
          return cardHover.rowId + 1
        }
      }
    } else {
      return 0
    }
  }
}
