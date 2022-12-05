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

context('blur event', () => {
  it('should not fire event', () => {
    setResolve()
    cy.visit(path.join(__dirname, 'index.html')).then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('blur-custom-event', setReject)
        window.addEventListener('blur-custom-event', setReject)
      })
      cy.get('.vue-select').click()
      cy.then(finish)
    })
  })

  it('should not fire event after adding option', () => {
    setResolve()
    cy.visit(path.join(__dirname, 'index.html')).then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('blur-custom-event', setReject)
        window.addEventListener('blur-custom-event', setReject)
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
        window.removeEventListener('blur-custom-event', setReject)
        window.addEventListener('blur-custom-event', setReject)
      })
      cy.get('.vue-dropdown').children().first().click()
      cy.then(finish)
    })
  })

  it('should not fire event after removing option by click tag', () => {
    setResolve()
    cy.visit(path.join(__dirname, 'index.html')).then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('blur-custom-event', setReject)
        window.addEventListener('blur-custom-event', setReject)
      })
      cy.get('.icon.delete').first().click()
      cy.then(finish)
    })
  })

  it('should fire event', () => {
    setReject()
    cy.visit(path.join(__dirname, 'index.html')).then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('blur-custom-event', setResolve)
        window.addEventListener('blur-custom-event', setResolve)
      })
      cy.get('#previous-button').click()
      cy.then(finish)
    })
  })

  it('should fire event after clicking arrow downward icon', () => {
    setReject()
    cy.visit(path.join(__dirname, 'index.html')).then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('blur-custom-event', setResolve)
        window.addEventListener('blur-custom-event', setResolve)
      })
      cy.get('.icon.arrow-downward').click()
      cy.then(finish)
    })
  })
})
