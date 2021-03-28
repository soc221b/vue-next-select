/// <reference types="cypress" />
import path from 'path'

context('visible-options', () => {
  it('should show all options by default', () => {
    cy.visit(path.join(__dirname, 'without.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown-item').children().should('have.length', 3)
  })

  it('should only show visible options', () => {
    cy.visit(path.join(__dirname, 'with.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown-item').children().should('have.length', 2)
  })
})
