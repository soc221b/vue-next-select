/// <reference types="cypress" />

context('visible-options', () => {
  it('should show all options by default', () => {
    cy.visit('/cypress/fixtures/visible-options/without.html')
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown-item').children().should('have.length', 3)
  })

  it('should only show visible options', () => {
    cy.visit('/cypress/fixtures/visible-options/with.html')
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown-item').children().should('have.length', 2)
  })
})
