import { EventHandler } from '@/plugins/eventHandler'
import { SmoothScroll } from './smoothScroll'

export class ScrollActivator {
  constructor ({ rect, scrollTo }) {
    this.rect = rect
    this.scrollTo = scrollTo
  }
}

export class ActivatorEventHandler {
  constructor (container, activatorRect) {
    this.activatorRect = activatorRect
    this.container = container

    this.eventId = this._generateId()
    this.isHover = false
    this.mouseOffset = {
      x: 0,
      y: 0
    }

    this.mouseMove = new EventHandler({
      eventType: 'pointermove',
      element: container,
      handler: (event, callback) => this._mouseMoveHandler(event, callback)
    })
    this.mouseLeave = new EventHandler({
      eventType: 'pointerleave',
      element: container,
      handler: (event) => this._mouseLeaveHandler(event)
    })

    this.focus = new EventHandler({
      eventType: 'activatorFocus',
      element: container,
      handler: (event, callback) => {
        if (event.detail.eventId === this.eventId) {
          callback(event)
        }
      }
    })
    this.blur = new EventHandler({
      eventType: 'activatorBlur',
      element: container,
      handler: (event, callback) => {
        if (event.detail.eventId === this.eventId) {
          callback(event)
        }
      }
    })
    this.hover = new EventHandler({
      eventType: 'activatorHover',
      element: container,
      handler: (event, callback) => {
        if (event.detail.eventId === this.eventId) {
          callback(event)
        }
      }
    })

    this.init()
  }

  init () {
    this.mouseMove.addListener(() => {})
    this.mouseLeave.addListener(() => {})
  }

  destroy () {
    this.mouseMove.removeListener()
    this.mouseLeave.removeListener()
    this.focus.removeListener()
    this.blur.removeListener()
    this.hover.removeListener()
  }

  _mouseMoveHandler (event) {
    const containerRect = this.container.getBoundingClientRect()
    const containerRectOffsetPage = {
      left: containerRect.left + window.scrollX,
      top: containerRect.top + window.scrollY
    }

    this.mouseOffset.x = event.pageX - containerRectOffsetPage.left
    this.mouseOffset.y = event.pageY - containerRectOffsetPage.top

    const mouseInActivatorRect =
      (this.mouseOffset.x >= this.activatorRect.left && this.mouseOffset.x <= this.activatorRect.right) && (this.mouseOffset.y >= this.activatorRect.top && this.mouseOffset.y <= this.activatorRect.bottom)

    if (mouseInActivatorRect) {
      const columnEvent = new CustomEvent('activatorHover', {
        detail: {
          eventId: this.eventId
        }
      })

      this.container.dispatchEvent(columnEvent)

      if (!this.isHover) {
        const columnEvent = new CustomEvent('activatorFocus', {
          detail: {
            eventId: this.eventId
          }
        })

        this.container.dispatchEvent(columnEvent)
        this.isHover = true
      }
    } else {
      if (this.isHover) {
        const columnEvent = new CustomEvent('activatorBlur', {
          detail: {
            eventId: this.eventId
          }
        })

        this.container.dispatchEvent(columnEvent)
        this.isHover = false
      }
    }
  }

  _mouseLeaveHandler (event) {
    const columnEvent = new CustomEvent('activatorBlur', {
      detail: {
        eventId: this.eventId
      }
    })

    this.container.dispatchEvent(columnEvent)
    this.mouseLeave.removeListener()
    this.isHover = false
  }

  _generateId () {
    return 'id-' + Date.now() + '-' + Math.floor(Math.random() * 10000)
  }
}

export class ScrollOnHover {
  constructor ({
    container,
    maxScrollSpeed
  }) {
    this.container = container
    this.maxScrollSpeed = maxScrollSpeed

    this.activatorsList = []
    this.activatorHandlers = []
  }

  add (activator) {
    if (!(activator instanceof ScrollActivator)) throw new Error('activator must be a ScrollActivator')
    this.activatorsList.push(activator)
  }

  init () {
    this.activatorsList.forEach(activator => {
      const scroll = new SmoothScroll(this.container)
      const activatorEvent = new ActivatorEventHandler(this.container, activator.rect)

      activatorEvent.hover.addListener(() => {
        const speed = this._calculateScrollSpeed(activatorEvent.mouseOffset, activator.rect, activator.scrollTo)

        scroll.setSpeed(speed)
      })

      activatorEvent.focus.addListener(() => {
        if (activator.scrollTo === 'top' || activator.scrollTo === 'left') {
          scroll.scrollY(-1)
          return
        }
        scroll.scrollY(1)
      })
      activatorEvent.blur.addListener(() => {
        scroll.stop()
      })

      this.activatorHandlers.push(activatorEvent)
    })
  }

  destroy () {
    this.container = null
    this.maxScrollSpeed = null
    this.activatorsList.splice(0, this.activatorsList.length)

    this.activatorHandlers.forEach(activator => activator.destroy())
    this.activatorHandlers.splice(0, this.activatorHandlers.length)
  }

  _calculateScrollSpeed (mouse, rect, scrollTo) {
    const maxSpeed = this.maxScrollSpeed

    let distance = 0
    let rectSize = 0
    let direction = 1

    switch (scrollTo) {
      case 'top':
        distance = mouse.y - rect.top
        rectSize = rect.bottom - rect.top
        direction = -1
        break
      case 'bottom':
        distance = rect.bottom - mouse.y
        rectSize = rect.bottom - rect.top
        direction = 1
        break
      case 'left':
        distance = mouse.x - rect.left
        rectSize = rect.right - rect.left
        direction = -1
        break
      case 'right':
        distance = rect.right - mouse.x
        rectSize = rect.right - rect.left
        direction = 1
        break
    }

    return direction * Math.max(0, (1 - distance / rectSize) * maxSpeed)
  }
}
