export class SmoothScroll {
  constructor (container) {
    this.container = container
    this.targetPosition = {
      x: 0,
      y: 0
    }
    this.scrollSpeed = 0.5
  }

  setSpeed (speed) {
    this.scrollSpeed = speed
  }

  _scrollY () {
    if (Math.abs(this.container.scrollTop - this.targetPosition.y) < 1) {
      return this.stop()
    }

    this.container.scrollBy({ top: this.scrollSpeed })
    this.animateId = requestAnimationFrame(this._scrollY.bind(this))
  }

  scrollY (direction) {
    if (direction === 1) {
      this.targetPosition.y = this.container.scrollHeight - this.container.clientHeight
    } else {
      this.targetPosition.y = 0
    }

    this._scrollY()
  }

  stop () {
    if (this.animateId) {
      cancelAnimationFrame(this.animateId)
      this.animateId = null
    }
  }
}
