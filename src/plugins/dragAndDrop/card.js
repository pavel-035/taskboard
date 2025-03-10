import { EventHandler } from '@/plugins/eventHandler'

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

  isDisable (isEditValue) {
    if (isEditValue) {
      CardStyleManager.setTransparent(this.nodeElement)
    } else {
      CardStyleManager.dropTransparent(this.nodeElement)
    }
  }
}

export class CardEventHandlers {
  constructor (container, cardDataAttribute) {
    this.cardDataAttribute = cardDataAttribute

    this.mouseDown = new EventHandler({
      eventType: 'pointerdown',
      element: container,
      handler: (event, callback) => this.mouseDownHandler(event, callback)
    })

    this.mouseUp = new EventHandler({
      eventType: 'pointerup',
      element: container,
      handler: (event, callback) => this.mouseUpHandler(event, callback)
    })

    this.mouseMove = new EventHandler({
      eventType: 'pointermove',
      element: container,
      handler: (event, callback) => this.mouseMoveHandler(event, callback)
    })

    this.targetCardNodeElement = null
  }

  mouseDownHandler (event, callback) {
    event.target.releasePointerCapture(event.pointerId)

    const isInteractive = event.target.closest('input, button, select, textarea')
    const target = event.target.closest(`[${this.cardDataAttribute}]`)

    if (target && !isInteractive) {
      this.targetCardNodeElement = target
      callback(event, target)
    }
  }

  mouseUpHandler (event, callback) {
    if (this.targetCardNodeElement) {
      this.targetCardNodeElement = null
      callback(event)
    }
  }

  mouseMoveHandler (event, callback) {
    const target = event.target.closest(`[${this.cardDataAttribute}]`)

    if (target) {
      const rect = target.getBoundingClientRect()
      const middleOfRect = rect.height / 2
      const mouseOffset = event.pageY - rect.top

      return mouseOffset < middleOfRect ? callback(event, target, 'top') : callback(event, target, 'bottom')
    }

    callback(null, null)
  }

  destroy () {
    this.mouseDown.removeListener()
    this.mouseUp.removeListener()
    this.mouseMove.removeListener()

    this.targetCardNodeElement = null
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
