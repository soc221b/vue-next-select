/// <reference types="cypress" />
import path from 'path'

context('label', () => {
  it('should show the placeholder then the selected', () => {
    cy.visit(path.join(__dirname, 'index.html'))
    cy.get('.vue-input').should('have.text', 'Select option')
    cy.get('.vue-select').click()
    cy.get('.vue-dropdown').children().first().click()
    cy.get('.vue-input').should('have.text', 'I')
  })

  it('should show the selected options count', () => {
    cy.visit(path.join(__dirname, 'multiple.html'))
    cy.get('.vue-input').should('have.text', 'Select option')
    cy.get('.vue-select').click()
    cy.get('.vue-dropdown').children().first().click()
    cy.get('.vue-input').should('have.text', '1')
    cy.get('.vue-dropdown').children().first().next().click()
    cy.get('.vue-input').should('have.text', '2')
  })
})
