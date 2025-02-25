const COLUMN_DATA_ATTRIBUTE_NAME = 'data-js-drag-column'
const COLUMN_BODY_DATA_ATTRIBUTE_NAME = 'data-js-drag-column-body'
const CARD_DATA_ATTRIBUTE_NAME = 'data-js-drag-card'

export default class {
  constructor ({ container }) {
    this.container = container

    this.baseColumn = null
    this.columnHover = null
    this.baseAdjacentCard = null
    this.cardHover = null

    this.initColumns()
    this.initHandlers()
  }

  initColumns () {
    const columnsNodeList = this.container.querySelectorAll(`[${COLUMN_DATA_ATTRIBUTE_NAME}]`)

    for (const columnElement of columnsNodeList) {
      const column = new Column(columnElement)

      column.element.addEventListener('mousedown', () => { this.baseColumn = column })
      column.element.addEventListener('mouseup', () => { this.baseColumn = null })
      column.element.addEventListener('mouseover', () => { this.columnHover = column })
      column.element.addEventListener('mouseout', () => { this.columnHover = null })
    }
  }

  initHandlers () {
    const cardsNodeList = this.container.querySelectorAll(`[${CARD_DATA_ATTRIBUTE_NAME}]`)

    for (const cardElement of cardsNodeList) {
      const card = new Card({ cardElement })
      const cardHandler = new CardHandler(card)
      const draggable = new DraggableCard(card)
      const dragHandler = new DragHandler({
        draggable,
        ondragdrop: () => {
          if (this.cardHover) {
            this.cardHover.element.after(card.element)
          } else if (this.columnHover) {
            this.columnHover.elementBody.prepend(card.element)
          } else {
            this.baseColumn.elementBody.prepend(card.element)
          }
        }
      })

      cardElement.addEventListener('mousedown', (event) => {
        dragHandler.onDragStart(event)
        cardHandler.removeBottomOverListener()
      })

      cardHandler.addBottomOverListener(() => { this.cardHover = card })
      cardHandler.addBottomOutListener(() => { this.cardHover = null })
    }
  }
}

class Column {
  constructor (columnElement) {
    this.element = columnElement
    this.elementBody = columnElement.querySelector(`[${COLUMN_BODY_DATA_ATTRIBUTE_NAME}]`)
    this.id = columnElement.getAttribute(COLUMN_DATA_ATTRIBUTE_NAME)
  }

  getPosition () {
    return this.element.getBoundingClientRect()
  }
}

class Card {
  constructor ({ cardElement }) {
    this.element = cardElement
    this.id = cardElement.getAttribute(CARD_DATA_ATTRIBUTE_NAME)
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

class CardHandler {
  constructor (card) {
    this.card = card

    this.bottomOverHandler = this.handleBottomOver.bind(this)
    this.onBottomMove = () => {}

    this.bottomOutHandler = this.handleBottomOut.bind(this)
    this.onBottomOut = () => {}
  }

  // BottomOverListener
  handleBottomOver (event) {
    const mouseOffsetY = event.pageY - this.card.getPosition().top

    if (mouseOffsetY >= (this.card.element.offsetHeight / 2)) {
      this.onBottomMove(event)
    }
  }

  addBottomOverListener (callback) {
    this.onBottomMove = callback
    this.card.element.addEventListener('mousemove', this.bottomOverHandler)
  }

  removeBottomOverListener () {
    this.card.element.removeEventListener('mousemove', this.bottomOverHandler)
  }

  // BottomOutListener
  handleBottomOut (event) {
    const mouseOffsetY = event.pageY - this.card.getPosition().top

    if (mouseOffsetY <= (this.card.element.offsetHeight / 2)) {
      this.onBottomOut(event)
    }
  }

  addBottomOutListener (callback) {
    this.onBottomOut = callback
    this.card.element.addEventListener('mouseout', this.bottomOutHandler)
  }

  removeBottomOutListener () {
    this.card.element.removeEventListener('mouseout', this.bottomOutHandler)
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

    this.card.element.style.cursor = 'grab'
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
  constructor ({ draggable, ondragdrop }) {
    if (!(draggable instanceof IDraggable)) {
      throw new Error('draggable must implement IDraggable')
    }

    this.draggable = draggable
    this.mouseOffset = { x: 0, y: 0 }

    this.boundOnDragMove = this.onDragMove.bind(this)
    this.boundOnDragDrop = this.onDragDrop.bind(this)
    this.ondragdrop = ondragdrop
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
    this.ondragdrop()
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
