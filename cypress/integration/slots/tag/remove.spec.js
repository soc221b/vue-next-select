/// <reference types="cypress" />
import path from 'path'

context('tag', () => {
  it('should expose remove function', () => {
    cy.visit(path.join(__dirname, 'remove.html'))
    cy.get('.vue-tag.selected').should('have.length', 1)

    cy.get('.vue-tag.selected').click()

    cy.get('.vue-tag.selected').should('have.length', 0)
  })
})
