/// <reference types="cypress" />

context('close event', () => {
  it('should not fire close event', () => {
    cy.visit('/cypress/fixtures/events/close.html')
    cy.get('.vue-select').click()

    return new Cypress.Promise((resolve, reject) => {
      cy.document().then(document => {
        document.removeEventListener('close-custom-event', reject)
        document.addEventListener('close-custom-event', reject)
        cy.get('.vue-select').click()
        resolve()
      })
    })
  })

  it('should not fire close event after adding option', () => {
    cy.visit('/cypress/fixtures/events/close.html')
    cy.get('.vue-select').click()

    return new Cypress.Promise((resolve, reject) => {
      cy.document().then(document => {
        document.removeEventListener('close-custom-event', reject)
        document.addEventListener('close-custom-event', reject)
        cy.get('.vue-dropdown').children().first().next().click()
        resolve()
      })
    })
  })

  it('should not fire close event after removing option', () => {
    cy.visit('/cypress/fixtures/events/close.html')
    cy.get('.vue-select').click()

    return new Cypress.Promise((resolve, reject) => {
      cy.document().then(document => {
        document.removeEventListener('close-custom-event', reject)
        document.addEventListener('close-custom-event', reject)
        cy.get('.vue-dropdown').children().first().click()
        resolve()
      })
    })
  })

  it('should not fire close event after removing option by click tag', () => {
    cy.visit('/cypress/fixtures/events/close.html')
    cy.get('.vue-select').click()

    return new Cypress.Promise((resolve, reject) => {
      cy.document().then(document => {
        document.removeEventListener('close-custom-event', reject)
        document.addEventListener('close-custom-event', reject)
        cy.get('.icon.delete').first().click()
        resolve()
      })
    })
  })

  it('should fire close event', () => {
    cy.visit('/cypress/fixtures/events/close.html')
    cy.get('.vue-select').click()

    return new Cypress.Promise(resolve => {
      cy.document().then(document => {
        document.removeEventListener('close-custom-event', resolve)
        document.addEventListener('close-custom-event', resolve)
        cy.get('#another-focusable-element').focus()
      })
    })
  })

  it('should fire close event after clicking arrow downward icon', () => {
    cy.visit('/cypress/fixtures/events/close.html')
    cy.get('.vue-select').click()

    return new Cypress.Promise(resolve => {
      cy.document().then(document => {
        document.removeEventListener('close-custom-event', resolve)
        document.addEventListener('close-custom-event', resolve)
        cy.get('.icon.arrow-downward').click()
      })
    })
  })
})
