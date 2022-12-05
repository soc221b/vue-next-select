/// <reference types="cypress" />
import path from 'path'

context('toggle', () => {
  it('should expose slot', () => {
    cy.visit(path.join(__dirname, 'index.html'))

    cy.get('#custom-toggle').should('exist')
    cy.get('#custom-toggle').should('have.text', 'Closing')

    cy.get('#custom-toggle').click()

    cy.get('#custom-toggle').should('have.text', 'Opening')
  })
})
