/// <reference types="cypress" />

context('model', () => {
  it('should update when model changed', () => {
    cy.visit('/cypress/fixtures/model/change-model.html')
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown-item.selected').should('have.length', 1)
    cy.get('.vue-tag.selected').should('have.length', 1)

    cy.get('#previous-button').click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 2)
    cy.get('.vue-tag.selected').should('have.length', 2)

    cy.get('#previous-button').click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 3)
    cy.get('.vue-tag.selected').should('have.length', 3)

    cy.get('#previous-button').click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 0)
    cy.get('.vue-tag.selected').should('have.length', 0)
  })
})
