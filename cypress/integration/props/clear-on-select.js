/// <reference types="cypress" />

context('clear on select', () => {
  it('should open dropdown', () => {
    cy.visit('/cypress/fixtures/clear-on-select/index.html')
    cy.get('.vue-select').click()

    cy.get('input').type('i')
    cy.get('input').should('have.value', 'i')
    cy.get('.vue-dropdown').children().should('have.length', 1)

    cy.get('.vue-dropdown-item').first().click()
    cy.get('input').should('have.value', '')
    cy.get('.vue-dropdown').children().should('have.length', 3)
  })
})
