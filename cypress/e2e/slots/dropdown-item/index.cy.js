/// <reference types="cypress" />
import path from 'path'

context('dropdown-item', () => {
  it('should expose slot', () => {
    cy.visit(path.join(__dirname, 'index.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown-item').should('have.text', 'I')
  })
})
