import { Card } from '@/plugins/dragAndDrop/card'
import { Column } from '@/plugins/dragAndDrop/column'

export class DOMManager {
  constructor ({
    container,
    cardDataAttribute,
    columnDataAttribute
  }) {
    this.container = container
    this.cardDataAttribute = cardDataAttribute
    this.columnDataAttribute = columnDataAttribute

    this.columnNodeList = []
    this.cardNodeList = []
  }

  fetchColumns () {
    const columnNodeList = this.container.querySelectorAll(`[${this.columnDataAttribute}]`)
    const columns = []

    columnNodeList.forEach((columnNodeElement) => {
      const column = new Column({
        id: Number(columnNodeElement.getAttribute(this.columnDataAttribute)),
        nodeElement: columnNodeElement
      })

      this.columnNodeList.push(columnNodeElement)
      columns.push(column)
    })

    return columns
  }

  fetchCards () {
    const cards = []

    if (!this.columnNodeList.length) {
      throw new Error('No columns found')
    }

    this.columnNodeList.forEach((columnNodeElement) => {
      const cardNodeList = columnNodeElement.querySelectorAll(`[${this.cardDataAttribute}]`)

      cardNodeList.forEach((cardNodeElement, cardNodeElementIndex) => {
        const card = new Card({
          columnId: Number(columnNodeElement.getAttribute(this.columnDataAttribute)),
          id: Number(cardNodeElement.getAttribute(this.cardDataAttribute)),
          rowId: cardNodeElementIndex,
          nodeElement: cardNodeElement
        })

        this.cardNodeList.push(cardNodeElement)
        cards.push(card)
      })
    })

    return cards
  }

  static observeDOMChanges (container, callback) {
    const observer = new MutationObserver(() => {
      callback()
      observer.disconnect()
    })

    observer.observe(container, { subtree: true, childList: true })
  }

  static findCardByNodeElement (cards, nodeElement, cardDataAttribute) {
    const cardId = Number(nodeElement.getAttribute(cardDataAttribute))

    if (cardId === null) return null
    return cards.find(card => {
      return card.id === cardId
    })
  }

  static getPositionRelativePage (nodeElement) {
    const rect = nodeElement.getBoundingClientRect()

    return {
      top: rect.top + window.scrollY,
      right: rect.right + window.scrollX,
      bottom: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX
    }
  }
}

export class DOMStyleManager {
  static blockBodyScroll () {
    document.body.style.overflow = 'hidden'
  }

  static unblockBodyScroll () {
    document.body.style.overflow = 'auto'
  }
}
