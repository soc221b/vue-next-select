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

context('search:blur event', () => {
  it('should not fire event after adding option', () => {
    cy.visit(path.join(__dirname, 'index.html')).then(window => {
      setResolve()
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('search:blur-custom-event', setReject)
        window.addEventListener('search:blur-custom-event', setReject)
      })
      cy.wait(50).get('.vue-dropdown').children().first().next().click()
      cy.then(finish)
    })
  })

  it('should not fire event after removing option', () => {
    cy.visit(path.join(__dirname, 'index.html')).then(window => {
      setResolve()
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('search:blur-custom-event', setReject)
        window.addEventListener('search:blur-custom-event', setReject)
      })
      cy.wait(50).get('.vue-dropdown').children().first().click()
      cy.then(finish)
    })
  })

  it('should not fire event after removing option by clicking tag', () => {
    cy.visit(path.join(__dirname, 'index.html')).then(window => {
      setResolve()
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('search:blur-custom-event', setReject)
        window.addEventListener('search:blur-custom-event', setReject)
      })
      cy.get('.vue-tags .icon').first().click()
      cy.then(finish)
    })
  })

  it('should fire event', () => {
    cy.visit(path.join(__dirname, 'index.html')).then(window => {
      setReject()
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('search:blur-custom-event', setResolve)
        window.addEventListener('search:blur-custom-event', setResolve)
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
        window.removeEventListener('search:blur-custom-event', setResolve)
        window.addEventListener('search:blur-custom-event', setResolve)
      })
      cy.get('.icon.arrow-downward').click()
      cy.then(finish)
    })
  })
})
