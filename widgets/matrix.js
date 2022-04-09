export default class {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.element = document.createElement("div")
    this.element.style.cssText = `
      margin: 1rem;
      background: #f5f5f5;
      display: inline-grid;
      grid-gap: 4px;
      grid-template-rows: repeat(${height}, 1rem);
      grid-template-columns: repeat(${height}, 1rem);
    `
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        let el = document.createElement("div")
        el.style.cssText = `
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(0, 0, 0, 0.5);
          text-align: center;
        `
        this.element.appendChild(el)
      }
    }
    //HTMLElement.prototype.__defineGetter__("currentStyle", function () {
    //  return this.ownerDocument.defaultView.getComputedStyle(this, null);
    //});
  }
  setItem(x, y, value) {
    let color = `rgba(${value}, ${value}, ${value}, .8)`
    this.element.childNodes[this.width * y + x].style.backgroundColor = color
  }
  setIndex(index, value) {
    let color = `rgba(${value}, ${value}, ${value}, .8)`
    this.element.childNodes[index].style.backgroundColor = color
  }
}
