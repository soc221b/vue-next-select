/// <reference types="cypress" />

context('value-by', () => {
  it('should not match any value', () => {
    cy.visit('/cypress/fixtures/value-by/without.html')
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown-item.selected').should('have.length', 0)
  })

  it('should works with path', () => {
    cy.visit('/cypress/fixtures/value-by/with-path.html')
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown-item.selected').should('have.length', 1)
  })

  it('should works with function', () => {
    cy.visit('/cypress/fixtures/value-by/with-function.html')
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown-item.selected').should('have.length', 1)
  })
})
