/// <reference types="cypress" />

context('searchable', () => {
  it('should not be searchable by default', () => {
    cy.visit('/cypress/fixtures/searchable/without.html')
    cy.get('.vue-select').click()

    cy.get('.vue-select').should('not.contain.html', 'Type to search')
  })

  it('should open dropdown', () => {
    cy.visit('/cypress/fixtures/searchable/without.html')
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').should('have.length', 1)
  })

  it('should open dropdown', () => {
    cy.visit('/cypress/fixtures/searchable/with.html')
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').should('have.length', 1)
  })

  it('filter typing value', () => {
    cy.visit('/cypress/fixtures/searchable/with.html')
    cy.get('.vue-select').click()

    cy.get('.vue-input').type('i')
    cy.get('.vue-dropdown-item').should('have.length', 1)
  })
})
