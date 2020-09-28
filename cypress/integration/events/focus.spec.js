/// <reference types="cypress" />

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

context('focus event', () => {
  it('should not fire focus event after adding option', () => {
    setResolve()
    cy.visit('/cypress/fixtures/events/focus.html').then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('focus-custom-event', setReject)
        window.addEventListener('focus-custom-event', setReject)
      })
      cy.get('.vue-dropdown').children().first().next().click()
      cy.then(finish)
    })
  })

  it('should not fire focus event after removing option', () => {
    setResolve()
    cy.visit('/cypress/fixtures/events/focus.html').then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('focus-custom-event', setReject)
        window.addEventListener('focus-custom-event', setReject)
      })
      cy.get('.vue-dropdown').children().first().click()
      cy.then(finish)
    })
  })

  it('should not fire focus event after removing option by clicking tag', () => {
    setResolve()
    cy.visit('/cypress/fixtures/events/focus.html').then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('focus-custom-event', setReject)
        window.addEventListener('focus-custom-event', setReject)
      })
      cy.get('.vue-tags').children().first().click()
      cy.then(finish)
    })
  })

  it('should fire focus event', () => {
    setReject()
    cy.visit('/cypress/fixtures/events/focus.html').then(window => {
      cy.then(() => {
        window.removeEventListener('focus-custom-event', setResolve)
        window.addEventListener('focus-custom-event', setResolve)
      })
      cy.get('.vue-select').click()
      cy.then(finish)
    })
  })

  it('should fire focus event after clicking arrow downward icon', () => {
    setReject()
    cy.visit('/cypress/fixtures/events/focus.html').then(window => {
      cy.then(() => {
        window.removeEventListener('focus-custom-event', setResolve)
        window.addEventListener('focus-custom-event', setResolve)
      })
      cy.get('.icon.arrow-downward').click()
      cy.then(finish)
    })
  })
})
