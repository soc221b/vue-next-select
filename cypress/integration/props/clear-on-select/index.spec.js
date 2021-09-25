/// <reference types="cypress" />
import path from 'path'

context('clear on change', () => {
  it('should open dropdown', () => {
    cy.visit(path.join(__dirname, 'index.html'))
    cy.get('.vue-select').click()

    cy.get('input').type('i')
    cy.get('input').should('have.value', 'i')
    cy.get('.vue-dropdown').children().should('have.length', 1)

    cy.get('.vue-dropdown-item').first().click()
    cy.get('input').should('have.value', '')
    cy.get('.vue-dropdown').children().should('have.length', 3)
  })
})
