/// <reference types="cypress" />

context('focus event', () => {
  it('should not fire focus event after adding option', () => {
    cy.visit('/cypress/fixtures/events/focus.html')
    cy.get('.vue-select').click()

    return new Cypress.Promise((resolve, reject) => {
      cy.document().then(document => {
        document.removeEventListener('focus-custom-event', reject)
        document.addEventListener('focus-custom-event', reject)
        cy.get('.vue-dropdown').children().first().next().click()
        resolve()
      })
    })
  })

  it('should not fire focus event after removing option', () => {
    cy.visit('/cypress/fixtures/events/focus.html')
    cy.get('.vue-select').click()

    return new Cypress.Promise((resolve, reject) => {
      cy.document().then(document => {
        document.removeEventListener('focus-custom-event', reject)
        document.addEventListener('focus-custom-event', reject)
        cy.get('.vue-dropdown').children().first().click()
        resolve()
      })
    })
  })

  it('should not fire focus event after removing option by clicking tag', () => {
    cy.visit('/cypress/fixtures/events/focus.html')
    cy.get('.vue-select').click()

    return new Cypress.Promise((resolve, reject) => {
      cy.document().then(document => {
        document.removeEventListener('focus-custom-event', reject)
        document.addEventListener('focus-custom-event', reject)
        cy.get('.vue-tags').children().first().click()
        resolve()
      })
    })
  })

  it('should fire focus event', () => {
    cy.visit('/cypress/fixtures/events/focus.html')

    return new Cypress.Promise(resolve => {
      cy.document().then(document => {
        document.removeEventListener('focus-custom-event', resolve)
        document.addEventListener('focus-custom-event', resolve)
        cy.get('.vue-select').click()
      })
    })
  })

  it('should fire focus event after clicking arrow downward icon', () => {
    cy.visit('/cypress/fixtures/events/focus.html')

    return new Cypress.Promise(resolve => {
      cy.document().then(document => {
        document.removeEventListener('focus-custom-event', resolve)
        document.addEventListener('focus-custom-event', resolve)
        cy.get('.icon.arrow-downward').click()
      })
    })
  })
})
