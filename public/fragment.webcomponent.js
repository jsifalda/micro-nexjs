console.log('webcomponents ready')

// var setInnerHTML = function (elm, html) {
//   elm.innerHTML = html
//   Array.from(elm.querySelectorAll('script')).forEach((oldScript) => {
//     const newScript = document.createElement('script')
//     Array.from(oldScript.attributes).forEach((attr) =>
//       newScript.setAttribute(attr.name, attr.value),
//     )
//     newScript.appendChild(document.createTextNode(oldScript.innerHTML))
//     oldScript.parentNode.replaceChild(newScript, oldScript)
//   })
// }

const fragments = []

class Fragment extends HTMLElement {
  constructor() {
    super()
    // console.log('import-fragment defined')
    this.mountPoint = document.createElement('div')
    this.attachShadow({ mode: 'closed' }).appendChild(this.mountPoint)
  }

  async connectedCallback() {
    if (this.attributes.src) {
      const { src } = this.attributes
      // console.log({ src })
      try {
        // const result = await fetch(src.value, { method: 'get' })
        // const body = await result.text()
        // console.log({ result, body })
        // this.innerHTML = body

        const frame = document.createElement('iframe')
        frame.style.border = 'none'
        frame.style.width = '100%'
        // frame.style.flex = 1
        frame.src = src.value
        this.mountPoint.appendChild(frame)

        const w = frame.contentWindow || frame.contentDocument
        w.$name = src.value
        w.addEventListener('message', (e) => {
          if (e.data.type) {
            console.log('shoudl dispatch', e.data.type)
            w.dispatchEvent(
              new CustomEvent(e.data.type, {
                bubbles: true,
                composed: true,
                cancelable: false,
              }),
            )
          }
        })
        w.addEventListener(
          '$MESSAGE',
          (e) => {
            // console.log('triggered;', {
            //   // e,
            //   data: e.detail,
            //   // i: document.querySelectorAll('iframe'),
            //   // p: window.parent,
            // })
            window.parent.postMessage(
              { data: e.detail, source: src.value },
              '*',
            )
          },
          false,
        )

        fragments.push(frame)
        console.log('fragment', src.value, 'mounted')

        // mountPoint.innerHTML = `<iframe src="${src.value}" style="border:0;width:100%;" />`
        // mountPoint.innerHTML = body
        // setInnerHTML(mountPoint, body)
      } catch (e) {
        console.error(e)
      }
    }
  }
}

// console.log({ customElements })
customElements.define('import-fragment', Fragment)

window.addEventListener('message', (e) => {
  const { type, ...data } = e.data?.data || {}

  if (type) {
    console.log('---sending message type', type, data)
    fragments
      // .filter((fragment) => {
      //   // console.log({ ff: fragment })
      //   return fragment.contentWindow.$name !== e.data.source
      // })
      .forEach((fragment) => {
        fragment.contentWindow.postMessage({ type, data })
      })
  }
})
