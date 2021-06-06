/// <reference types="cypress" />
import path from 'path'

let shouldReject = null
const setReject = () => {
  if (shouldReject !== null) return
  shouldReject = true
}
const setResolve = () => {
  if (shouldReject !== null) return
  shouldReject = false
}
const finish = () => {
  if (shouldReject) throw Error()
}

context('sequence of events', () => {
  beforeEach(() => {
    shouldReject = null
  })

  it('should fire open event first', () => {
    cy.visit(path.join(__dirname, 'single.html')).then(window => {
      cy.then(() => {
        window.removeEventListener('focus-custom-event', setResolve)
        window.addEventListener('focus-custom-event', setResolve)
      })
      cy.then(() => {
        window.removeEventListener('search:focus-custom-event', setReject)
        window.addEventListener('search:focus-custom-event', setReject)
      })
      cy.get('.vue-select').click()
      cy.then(finish)
    })
  })

  it('should fire open event first after clicking arrow downward icon', () => {
    cy.visit(path.join(__dirname, 'single.html')).then(window => {
      cy.then(() => {
        window.removeEventListener('focus-custom-event', setResolve)
        window.addEventListener('focus-custom-event', setResolve)
      })
      cy.then(() => {
        window.removeEventListener('search:focus-custom-event', setReject)
        window.addEventListener('search:focus-custom-event', setReject)
      })
      cy.get('.icon.arrow-downward').click()
      cy.then(finish)
    })
  })

  it('should fire blur event first', () => {
    cy.visit(path.join(__dirname, 'single.html')).then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('search:blur-custom-event', setResolve)
        window.addEventListener('search:blur-custom-event', setResolve)
      })
      cy.then(() => {
        window.removeEventListener('blur-custom-event', setReject)
        window.addEventListener('blur-custom-event', setReject)
      })
      cy.get('#previous-button').click()
      cy.then(finish)
    })
  })

  it('should fire blur event first after clicking arrow downward icon', () => {
    cy.visit(path.join(__dirname, 'single.html')).then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('search:blur-custom-event', setResolve)
        window.addEventListener('search:blur-custom-event', setResolve)
      })
      cy.then(() => {
        window.removeEventListener('blur-custom-event', setReject)
        window.addEventListener('blur-custom-event', setReject)
      })
      cy.get('.icon.arrow-downward').click()
      cy.then(finish)
    })
  })
})
