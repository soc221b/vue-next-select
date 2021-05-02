/// <reference types="cypress" />
import path from 'path'

context('loading', () => {
  it('should expose slot', () => {
    cy.visit(path.join(__dirname, 'index.html'))

    cy.get('#custom-loading').should('not.exist')

    cy.get('input').type('i')
    cy.get('#custom-loading').should('exist')

    cy.wait(100).then(() => {
      cy.get('#custom-loading').should('not.exist')
    })
  })
})
