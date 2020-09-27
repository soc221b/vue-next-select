/// <reference types="cypress" />

context('search-input event', () => {
  it('should fire search-input event after type something', () => {
    cy.visit('/cypress/fixtures/events/search-input.html')
    cy.get('.vue-select').click()

    return new Cypress.Promise((resolve, reject) => {
      cy.document().then(document => {
        document.documentElement.addEventListener('custom-event', resolve)
        cy.get('.vue-input').type('i')
      })
    })
  })
})
