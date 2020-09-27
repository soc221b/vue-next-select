/// <reference types="cypress" />

context('remove event', () => {
  it('should fire remove event after removing option', () => {
    cy.visit('/cypress/fixtures/events/remove.html')
    cy.get('.vue-select').click()

    return new Cypress.Promise(resolve => {
      cy.document().then(document => {
        document.documentElement.addEventListener('custom-event', resolve)
        cy.get('.vue-dropdown').children().first().click()
      })
    })
  })

  it('should fire remove event after removing option by clicking tag', () => {
    cy.visit('/cypress/fixtures/events/remove.html')
    cy.get('.vue-select').click()

    return new Cypress.Promise(resolve => {
      cy.document().then(document => {
        document.documentElement.addEventListener('custom-event', resolve)
        cy.get('.vue-tags').children().first().click()
      })
    })
  })
})
