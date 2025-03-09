import { Card } from './card'
import { EventHandler } from './eventHandler'
import { DOMManager } from './DOMManager'

export class DraggableCard extends Card {
  constructor (card) {
    super(card)

    this.offsetWidth = card.nodeElement.offsetWidth
    this.mouseOffset = { x: 0, y: 0 }
  }

  init (event) {
    const { top: y, left: x } = this.getDraggableCardPosition()

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
    const { left, top } = this.getDraggableCardPosition()

    this.mouseOffset.x = pageX - left
    this.mouseOffset.y = pageY - top
  }

  getDraggableCardPosition () {
    return DOMManager.getPositionRelativePage(this.nodeElement)
  }
}

export class DraggableComponent {
  constructor ({
    card
  }) {
    this.card = card

    this.draggableCard = null
    this.draggableCardHandler = null
  }

  init (event) {
    this.draggableCard = new DraggableCard(this.card)
    this.draggableCard.init(event)

    this.draggableCardHandler = new DraggableHandler(document.body)
    this.draggableCardHandler.mouseMove.addListener((event) => this._onDragMove(event))
    this.draggableCardHandler.mouseUp.addListener((event) => this._onDragDrop(event))
  }

  _onDragMove (event) {
    const mouseOffset = this.draggableCard.mouseOffset
    const { x, y } = this._getDragPosition(event, mouseOffset)

    this.draggableCard.move(x, y)
  }

  _onDragDrop () {
    this.draggableCardHandler.destroy()
    this.draggableCard.destroy()

    this.draggableCardHandler = null
    this.draggableCard = null
  }

  _getDragPosition ({ pageX, pageY }, mouseOffset) {
    return {
      x: pageX - mouseOffset.x,
      y: pageY - mouseOffset.y
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
      eventType: 'pointermove',
      element: columnElement,
      handler: (event, callback) => {
        callback(event)
      }
    })
    this.mouseUp = new EventHandler({
      eventType: 'pointerup',
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
