/// <reference types="cypress" />

context('max', () => {
  it('can be removed by default', () => {
    cy.visit('/cypress/fixtures/max/without.html')
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').children().first().next().click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 2)

    cy.get('.vue-dropdown').children().first().next().next().click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 3)
  })

  it('should not be removed', () => {
    cy.visit('/cypress/fixtures/max/with.html')
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').children().first().next().click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 2)

    cy.get('.vue-dropdown').children().first().next().next().click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 2)
  })
})
