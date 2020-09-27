/// <reference types="cypress" />

context('allow-empty', () => {
  it('should not remove selected option by default', () => {
    cy.visit('/cypress/fixtures/allow-empty/without.html')
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').children().first().click()
    cy.get('.vue-dropdown').children().first().should('have.class', 'selected')
  })

  it('should remove selected option', () => {
    cy.visit('/cypress/fixtures/allow-empty/with.html')
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').children().first().click()
    cy.get('.vue-dropdown').children().first().should('not.have.class', 'selected')
  })
})
