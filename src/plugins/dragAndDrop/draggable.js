import { Card, Cards } from './card'
import { EventHandler } from './eventHandler'

export class DraggableCard extends Card {
  constructor (card) {
    super(card)

    this.offsetWidth = card.nodeElement.offsetWidth
    this.mouseOffset = { x: 0, y: 0 }
  }

  init (event) {
    const { top: y, left: x } = this.getPosition()

    this.setMouseOffset(event)
    this.nodeElement = this.nodeElement.cloneNode(true)

    DraggableStyleManager.setWidth(this.nodeElement, this.offsetWidth)
    DraggableStyleManager.setPosition(this.nodeElement, x, y)
    DraggableStyleManager.setGrabbingStyle(this.nodeElement)

    document.body.appendChild(this.nodeElement)
  }

  move (x, y) {
    DraggableStyleManager.setPosition(this.nodeElement, x, y)
  }

  destroy () {
    DraggableStyleManager.dropGrabbingStyle()
    document.body.removeChild(this.nodeElement)
  }

  setMouseOffset ({ pageX, pageY }) {
    const { left, top } = this.getPosition()

    this.mouseOffset.x = pageX - left
    this.mouseOffset.y = pageY - top
  }

  getPosition () {
    const rect = this.nodeElement.getBoundingClientRect()

    return {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX
    }
  }
}

export class DraggableStyleManager {
  static setGrabbingStyle (element) {
    element.style.cursor = 'grabbing'
    element.style.position = 'absolute'
    element.style.zIndex = '10'
    element.style.pointerEvents = 'none'

    document.body.style.userSelect = 'none'
  }

  static dropGrabbingStyle () {
    document.body.style.userSelect = 'inherit'
  }

  static setWidth (element, width) {
    element.style.width = `${width}px`
  }

  static setPosition (element, x, y) {
    element.style.left = `${x}px`
    element.style.top = `${y}px`
  }
}

export class DraggableHandler {
  constructor (columnElement) {
    this.mouseMove = new EventHandler({
      eventType: 'mousemove',
      element: columnElement,
      handler: (event, callback) => {
        callback(event)
      }
    })

    this.mouseUp = new EventHandler({
      eventType: 'mouseup',
      element: columnElement,
      handler: (event, callback) => {
        callback(event)
      }
    })
  }

  destroy () {
    this.mouseMove.removeListener()
    this.mouseUp.removeListener()
  }
}

export class DraggableCycle {
  constructor (draggableCard) {
    this.draggableCard = draggableCard

    this.draggableCardHandler = null
  }

  onDragStart (event) {
    this.draggableCard.init(event)
    this.draggableCardHandler = new DraggableHandler(document.body)

    this.draggableCardHandler.mouseMove.addListener((event) => this.onDragMove(event))
    this.draggableCardHandler.mouseUp.addListener((event) => this.onDragDrop(event))
  }

  onDragMove (event) {
    const mouseOffset = this.draggableCard.mouseOffset
    const { x, y } = Draggable.getDragPosition(event, mouseOffset)

    this.draggableCard.move(x, y)
  }

  onDragDrop () {
    this.draggableCardHandler.destroy()
    this.draggableCard.destroy()
  }
}

export class Draggable {
  constructor ({
    cards
  }) {
    if (!(cards instanceof Cards)) throw new Error('cards must implement Cards')

    this.cards = cards

    this.draggableCard = null
    this.draggableCycle = null
  }

  launch (event, cardNodeElement) {
    const card = this.cards.findCardByNodeElement(cardNodeElement)

    this.draggableCard = new DraggableCard(card)
    this.draggableCycle = new DraggableCycle(this.draggableCard)

    this.draggableCycle.onDragStart(event)
  }

  static getDragPosition ({ pageX, pageY }, mouseOffset) {
    return {
      x: pageX - mouseOffset.x,
      y: pageY - mouseOffset.y
    }
  }
}
