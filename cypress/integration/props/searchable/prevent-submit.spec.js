/// <reference types="cypress" />
import path from 'path'

context('prevent-submit', () => {
  it('should prevent submit when press enter key', () => {
    cy.visit(path.join(__dirname, 'prevent-submit.html'))
    cy.get('.vue-select').click()

    cy.get('input').type('{enter}')

    cy.get('.icon.arrow-downward').click()
    cy.get('button').should('contain.text', 'Submit!')
  })
})
