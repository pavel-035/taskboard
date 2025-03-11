import { CardEventHandlers } from './card'
import { DOMManager } from './DOMManager'
import { DraggableComponent } from './draggable'
import { ColumnEventHandler } from './column'
import { ContainerHoverScroller, ColumnHoverScroller } from './scroller'

export default class {
  constructor ({
    container,
    columnDataAttribute,
    cardDataAttribute,
    scrollDataAttribute,
    onDrop
  }) {
    this.container = container
    this.columnDataAttribute = columnDataAttribute
    this.cardDataAttribute = cardDataAttribute
    this.scrollDataAttribute = scrollDataAttribute
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
      column.nodeElement.style.touchAction = 'none'

      const hoverScroller = new ColumnHoverScroller(column, this.scrollDataAttribute)
      const columnEventHandler = new ColumnEventHandler(column.nodeElement)

      columnEventHandler.mouseDown.addListener(() => {
        hoverScroller.init()
      })
      columnEventHandler.mouseUp.addListener(() => {
        hoverScroller.destroy()
      })
      columnEventHandler.mouseEnter.addListener(() => {
        this.focusColumnId = column.id

        if (this.editCard) hoverScroller.init()
      })
      columnEventHandler.mouseLeave.addListener(() => {
        this.focusColumnId = null

        if (this.editCard) hoverScroller.destroy()
      })

      this.eventHandlers.push(columnEventHandler)
    })

    const hoverScroller = new ContainerHoverScroller(this.container)
    const cardEventHandlers = new CardEventHandlers(this.container, this.cardDataAttribute)

    cardEventHandlers.mouseDown.addListener((event, target) => {
      this.onMouseDown(event, target)
      hoverScroller.init()

      cardEventHandlers.mouseUp.addListener(() => {
        this.onMouseUp()
        cardEventHandlers.mouseMove.removeListener()
        hoverScroller.destroy()
      })
      cardEventHandlers.mouseMove.addListener((event, target, mouseOffset) => {
        this.onMouseMove(event, target, mouseOffset)
      })
    })

    DOMManager.observeDOMChanges(this.container, () => this.update())

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
    const focusRowId = this.focusRowId
    const editCardId = this.editCard.id

    if (focusColumnId !== null && editCardId !== null && focusRowId !== null) {
      if (this.editCard.columnId !== focusColumnId || this.editCard.rowId !== focusRowId) {
        this.onDropCallback(editCardId, focusColumnId, focusRowId)
      }
    }

    this.editCard.isDisable(false)
    this.focusRowId = null
    this.editCard = null
  }

  onMouseMove (event, target, mouseOffset) {
    this.focusRowId = this.calculateTargetRowId(target, mouseOffset)
  }

  calculateTargetRowId (target, mouseOffset) {
    if (!target) return 0

    const hoveredCard = DOMManager.findCardByNodeElement(this.cards, target, this.cardDataAttribute)
    if (hoveredCard.id === this.editCard.id) return this.editCard.rowId

    const isDifferentColumn = hoveredCard.columnId !== this.editCard.columnId
    const columnCards = this.cards
      .filter(card => card.columnId === this.focusColumnId)
      .sort((a, b) => a.rowId - b.rowId)

    const isBelow = hoveredCard.rowId > this.editCard.rowId
    const lastRowId = columnCards.at(-1)?.rowId ?? 0
    const maxRowId = isDifferentColumn ? lastRowId + 1 : lastRowId

    switch (mouseOffset) {
      case 'top':
        return !isDifferentColumn && isBelow ? Math.max(hoveredCard.rowId - 1, 0) : hoveredCard.rowId

      case 'bottom':
        return !isDifferentColumn && isBelow ? hoveredCard.rowId : Math.min(hoveredCard.rowId + 1, maxRowId)

      default:
        return 0
    }
  }
}
