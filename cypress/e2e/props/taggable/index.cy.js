/// <reference types="cypress" />
import path from 'path'

context('taggable', () => {
  it('should not have tag by default', () => {
    cy.visit(path.join(__dirname, 'without.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-tag.selected').should('have.length', 0)
  })

  it('should show selected options as tags', () => {
    cy.visit(path.join(__dirname, 'with.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-tag.selected').should('have.length', 1)

    cy.get('.vue-dropdown').children().first().next().click()
    cy.get('.vue-tag.selected').should('have.length', 2)

    cy.get('.vue-dropdown').children().first().next().next().click()
    cy.get('.vue-tag.selected').should('have.length', 3)
  })
})
