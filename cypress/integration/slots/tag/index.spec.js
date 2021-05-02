/// <reference types="cypress" />
import path from 'path'

context('tag', () => {
  it('should expose slot', () => {
    cy.visit(path.join(__dirname, 'index.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-tag').should('have.text', 'I')
  })
})
