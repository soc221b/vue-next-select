import { JSDOM } from 'jsdom'

export function createDocument() {
  const { window } = new JSDOM(`
    <!DOCTYPE html>
    <html>
    <body>
    </body>
    </html>
  `)
  return {
    window,
    document: window.document,
  }
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
