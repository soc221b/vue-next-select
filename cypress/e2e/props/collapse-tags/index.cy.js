/// <reference types="cypress" />
import path from 'path'

context('collapse-tags', () => {
  it('should not collapse tags by default', () => {
    cy.visit(path.join(__dirname, 'without.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').children().click({ multiple: true })
    cy.get('.vue-tags').should('not.have.class', 'collapsed')
  })

  it('should collapse tags', () => {
    cy.visit(path.join(__dirname, 'with.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').children().click({ multiple: true })
    cy.get('.vue-tags').should('have.class', 'collapsed')
  })
})
