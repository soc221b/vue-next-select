/// <reference types="cypress" />

context('search-change event', () => {
  it('should not fire search-change event after type something', () => {
    cy.visit('/cypress/fixtures/events/search-change.html')
    cy.get('.vue-select').click()

    return new Cypress.Promise((resolve, reject) => {
      cy.document().then(document => {
        document.removeEventListener('search-change-custom-event', reject)
        document.addEventListener('search-change-custom-event', reject)
        cy.get('.vue-input').type('i')
        resolve()
      })
    })
  })

  it('should not fire search-change event after direct blur', () => {
    cy.visit('/cypress/fixtures/events/search-change.html')
    cy.get('.vue-select').click()

    return new Cypress.Promise((resolve, reject) => {
      cy.document().then(document => {
        document.removeEventListener('search-change-custom-event', reject)
        document.addEventListener('search-change-custom-event', reject)
        cy.get('#another-focusable-element').focus()
        resolve()
      })
    })
  })

  it('should fire search-change event after type something and blur', () => {
    cy.visit('/cypress/fixtures/events/search-change.html')
    cy.get('.vue-select').click()

    return new Cypress.Promise(resolve => {
      cy.document().then(document => {
        document.removeEventListener('search-change-custom-event', resolve)
        document.addEventListener('search-change-custom-event', resolve)
        cy.get('.vue-input').type('i')
        cy.get('#another-focusable-element').focus()
      })
    })
  })
})
