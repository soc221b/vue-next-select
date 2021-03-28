/// <reference types="cypress" />
import path from 'path'

context('loading', () => {
  it('should not be loading by default', () => {
    cy.visit(path.join(__dirname, 'without.html'))
    cy.get('.vue-select').click()

    cy.get('.loading').should('not.be.visible')
  })

  it('should not be removed', () => {
    cy.visit(path.join(__dirname, 'with.html'))
    cy.get('.vue-select').click()

    cy.get('.loading').should('be.visible')
  })
})
