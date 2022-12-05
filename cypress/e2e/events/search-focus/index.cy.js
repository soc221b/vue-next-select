/// <reference types="cypress" />
import path from 'path'

let shouldReject = false
const setReject = () => {
  shouldReject = true
}
const setResolve = () => {
  shouldReject = false
}
const finish = () => {
  if (shouldReject) throw Error()
}

context('search:focus event', () => {
  it('should not fire event after adding option', () => {
    setResolve()
    cy.visit(path.join(__dirname, 'index.html')).then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('search:focus-custom-event', setReject)
        window.addEventListener('search:focus-custom-event', setReject)
      })
      cy.get('.vue-dropdown').children().first().next().click()
      cy.then(finish)
    })
  })

  it('should not fire event after removing option', () => {
    setResolve()
    cy.visit(path.join(__dirname, 'index.html')).then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('search:focus-custom-event', setReject)
        window.addEventListener('search:focus-custom-event', setReject)
      })
      cy.get('.vue-dropdown').children().first().click()
      cy.then(finish)
    })
  })

  it('should not fire event after removing option by clicking tag', () => {
    setResolve()
    cy.visit(path.join(__dirname, 'index.html')).then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('search:focus-custom-event', setReject)
        window.addEventListener('search:focus-custom-event', setReject)
      })
      cy.get('.vue-tags').children().first().click()
      cy.then(finish)
    })
  })

  it('should fire event', () => {
    setReject()
    cy.visit(path.join(__dirname, 'index.html')).then(window => {
      cy.then(() => {
        window.removeEventListener('search:focus-custom-event', setResolve)
        window.addEventListener('search:focus-custom-event', setResolve)
      })
      cy.get('.vue-select').click()
      cy.then(finish)
    })
  })

  it('should fire event after clicking arrow downward icon', () => {
    setReject()
    cy.visit(path.join(__dirname, 'index.html')).then(window => {
      cy.then(() => {
        window.removeEventListener('search:focus-custom-event', setResolve)
        window.addEventListener('search:focus-custom-event', setResolve)
      })
      cy.get('.icon.arrow-downward').click()
      cy.then(finish)
    })
  })
})
