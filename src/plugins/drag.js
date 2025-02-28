const COLUMN_DATA_ATTRIBUTE_NAME = 'data-js-drag-column'
const CARD_DATA_ATTRIBUTE_NAME = 'data-js-drag-card'

export default class {
  constructor ({ container, dropCallback }) {
    this.container = container
    this.collumns = []
    this.dropCallback = dropCallback

    this.init()
  }

  init () {
    const columnsNodeList = this.container.querySelectorAll(`[${COLUMN_DATA_ATTRIBUTE_NAME}]`)

    columnsNodeList.forEach(columnElement => {
      const column = new Column(columnElement)
      const cardsNodeList = columnElement.querySelectorAll(`[${CARD_DATA_ATTRIBUTE_NAME}]`)

      cardsNodeList.forEach(cardElement => {
        const card = new Card(cardElement)
        const draggable = new DraggableCard(card)
        const dragHandler = new DragHandler({
          draggable,
          dropCallback: (result) => {
            console.log(result)
          }
        })

        card.element.addEventListener('mousedown', (event) => {
          dragHandler.onDragStart(event)
        })

        column.cards.push(card)
      })

      this.collumns.push(column)
    })
  }
}

class Column {
  constructor (columnElement) {
    this.element = columnElement
    this.id = Number(columnElement.getAttribute(COLUMN_DATA_ATTRIBUTE_NAME))

    this.cards = []
  }

  getPosition () {
    return this.element.getBoundingClientRect()
  }
}

class Card {
  constructor (cardElement) {
    this.element = cardElement
    this.id = Number(cardElement.getAttribute(CARD_DATA_ATTRIBUTE_NAME))
  }

  getPosition () {
    const rect = this.element.getBoundingClientRect()

    return {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX
    }
  }
}

class CardStyleManager {
  static setInitStyle (element) {
    element.style.cursor = 'grab'
  }

  static setGrabbingStyle (element) {
    element.style.width = `${element.offsetWidth}px`
    element.style.cursor = 'grabbing'
    element.style.position = 'absolute'
    element.style.zIndex = '10'
    element.style.pointerEvents = 'none'

    document.body.style.userSelect = 'none'
  }

  static dropGrabbingStyle (element) {
    element.style.width = '100%'
    element.style.cursor = 'grab'
    element.style.position = 'relative'
    element.style.pointerEvents = 'auto'

    document.body.style.userSelect = 'inherit'
  }

  static setPosition (element, x, y) {
    element.style.left = `${x}px`
    element.style.top = `${y}px`
  }
}

class IDraggable {
  onDragStart () {}
  onDragMove () {}
  onDragDrop () {}
}

class DraggableCard extends IDraggable {
  constructor (card) {
    super()
    this.card = card

    CardStyleManager.setInitStyle(this.card.element)
  }

  getPosition () {
    return this.card.getPosition()
  }

  onDragStart (x, y) {
    CardStyleManager.setPosition(this.card.element, x, y)
    CardStyleManager.setGrabbingStyle(this.card.element)

    document.body.appendChild(this.card.element)
  }

  onDragMove (x, y) {
    CardStyleManager.setPosition(this.card.element, x, y)
  }

  onDragDrop () {
    CardStyleManager.dropGrabbingStyle(this.card.element)
    CardStyleManager.setPosition(this.card.element, 0, 0)
  }
}

class DragHandler {
  constructor ({
    draggable,
    dropCallback
  }) {
    if (!(draggable instanceof IDraggable)) {
      throw new Error('draggable must implement IDraggable')
    }

    this.draggable = draggable
    this.dropCallback = dropCallback

    this.mouseOffset = { x: 0, y: 0 }

    this.boundOnDragMove = this.onDragMove.bind(this)
    this.boundOnDragDrop = this.onDragDrop.bind(this)
  }

  onDragStart (event) {
    this.mouseOffset.x = event.pageX - this.draggable.getPosition().left
    this.mouseOffset.y = event.pageY - this.draggable.getPosition().top

    const { x, y } = this.getDragPosition(event, this.mouseOffset)

    this.draggable.onDragStart(x, y)

    document.addEventListener('mousemove', this.boundOnDragMove)
    document.addEventListener('mouseup', this.boundOnDragDrop)
  }

  onDragMove (event) {
    const { x, y } = this.getDragPosition(event, this.mouseOffset)

    this.draggable.onDragMove(x, y)
  }

  onDragDrop () {
    if (this.dropCallback) {
      this.dropCallback({
        cardId: this.draggable.card.id,
        columnId: 1
      })
    }
    this.draggable.onDragDrop()

    document.removeEventListener('mousemove', this.boundOnDragMove)
    document.removeEventListener('mouseup', this.boundOnDragDrop)
  }

  getDragPosition ({ pageX, pageY }, mousePosition) {
    return {
      x: pageX - mousePosition.x,
      y: pageY - mousePosition.y
    }
  }
}
