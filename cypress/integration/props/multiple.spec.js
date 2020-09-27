/// <reference types="cypress" />

context('multiple', () => {
  it('can only select single option by default', () => {
    cy.visit('/cypress/fixtures/multiple/without.html')
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').children().first().next().click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 1)

    cy.get('.vue-dropdown').children().first().next().next().click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 1)
  })

  it('can select multiple option', () => {
    cy.visit('/cypress/fixtures/multiple/with.html')
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').children().first().next().click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 2)

    cy.get('.vue-dropdown').children().first().next().next().click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 3)
  })
})
