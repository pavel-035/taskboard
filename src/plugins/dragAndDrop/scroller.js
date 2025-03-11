import { ScrollActivator, ScrollOnHover } from '@/plugins/scroll/scrollOnHover'
import { Column } from '@/plugins/dragAndDrop/column'

export class ContainerHoverScroller {
  constructor (container) {
    this.container = container

    this.scroller = null
  }

  init () {
    this.scroller = new ScrollOnHover({
      container: this.container,
      maxScrollSpeed: 10
    })

    const scrollLeftActivator = new ScrollActivator({
      rect: {
        top: 0,
        right: this.container.clientWidth / 5,
        bottom: this.container.clientHeight,
        left: 0
      },
      scrollTo: 'left'
    })
    this.scroller.add(scrollLeftActivator)

    const scrollRightActivator = new ScrollActivator({
      rect: {
        top: 0,
        right: this.container.clientWidth,
        bottom: this.container.clientHeight,
        left: this.container.clientWidth - this.container.clientWidth / 5
      },
      scrollTo: 'right'
    })
    this.scroller.add(scrollRightActivator)

    this.scroller.init()
  }

  destroy () {
    if (this.scroller) this.scroller.destroy()
  }
}

export class ColumnHoverScroller {
  constructor (column, scrollDataAttribute) {
    if (!(column instanceof Column)) throw new Error('column must be a Column')
    this.column = column
    this.scrollDataAttribute = scrollDataAttribute

    this.scroller = null
  }

  init () {
    const container = this.column.nodeElement.querySelector(`[${this.scrollDataAttribute}]`)

    this.scroller = new ScrollOnHover({
      container,
      maxScrollSpeed: 5
    })

    const scrollTopActivator = new ScrollActivator({
      rect: {
        top: 0,
        right: container.clientWidth,
        bottom: container.clientHeight / 4,
        left: 0
      },
      scrollTo: 'top'
    })
    this.scroller.add(scrollTopActivator)

    const scrollBottomActivator = new ScrollActivator({
      rect: {
        top: container.clientHeight - container.clientHeight / 4,
        right: container.clientWidth,
        bottom: container.clientHeight,
        left: 0
      },
      scrollTo: 'bottom'
    })
    this.scroller.add(scrollBottomActivator)

    this.scroller.init()
  }

  destroy () {
    if (this.scroller) this.scroller.destroy()
  }
}
