/// <reference types="cypress" />
import path from 'path'

context('value-by', () => {
  it('should not match any value', () => {
    cy.visit(path.join(__dirname, 'without.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown-item.selected').should('have.length', 0)
  })

  it('should works with path', () => {
    cy.visit(path.join(__dirname, 'with-path.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown-item.selected').should('have.length', 1)
  })

  it('should works with function', () => {
    cy.visit(path.join(__dirname, 'with-function.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown-item.selected').should('have.length', 1)
  })
})
