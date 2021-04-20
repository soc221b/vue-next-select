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

context('closed event', () => {
  it('should not fire event', () => {
    cy.visit(path.join(__dirname, 'index.html')).then(window => {
      setResolve()
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('closed-custom-event', setReject)
        window.addEventListener('closed-custom-event', setReject)
      })
      cy.get('.vue-select').click()
      cy.then(finish)
    })
  })

  it('should not fire event after adding option', () => {
    cy.visit(path.join(__dirname, 'index.html')).then(window => {
      setResolve()
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('closed-custom-event', setReject)
        window.addEventListener('closed-custom-event', setReject)
      })
      cy.get('.vue-dropdown').children().first().next().click()
      cy.then(finish)
    })
  })

  it('should not fire event after removing option', () => {
    cy.visit(path.join(__dirname, 'index.html')).then(window => {
      setResolve()
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('closed-custom-event', setReject)
        window.addEventListener('closed-custom-event', setReject)
      })
      cy.get('.vue-dropdown').children().first().click()
      cy.then(finish)
    })
  })

  it('should not fire event after removing option by click tag', () => {
    cy.visit(path.join(__dirname, 'index.html')).then(window => {
      setResolve()
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('closed-custom-event', setReject)
        window.addEventListener('closed-custom-event', setReject)
      })
      cy.get('.icon.delete').first().click()
      cy.then(finish)
    })
  })

  it('should fire event', () => {
    cy.visit(path.join(__dirname, 'index.html')).then(window => {
      setReject()
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('closed-custom-event', setResolve)
        window.addEventListener('closed-custom-event', setResolve)
      })
      cy.get('#previous-button').click()
      cy.then(finish)
    })
  })

  it('should fire event after clicking arrow downward icon', () => {
    cy.visit(path.join(__dirname, 'index.html')).then(window => {
      setReject()
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('closed-custom-event', setResolve)
        window.addEventListener('closed-custom-event', setResolve)
      })
      cy.get('.icon.arrow-downward').click()
      cy.then(finish)
    })
  })
})
