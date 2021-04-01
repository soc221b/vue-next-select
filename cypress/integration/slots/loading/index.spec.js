/// <reference types="cypress" />
import path from 'path'

context('loading (searchable)', () => {
  it('should pass isLoading', () => {
    cy.visit(path.join(__dirname, 'index.html'))
    cy.get('.vue-select').should('have.text', 'closing')
    cy.get('.vue-select').should('not.have.text', 'loading')

    cy.get('input').type('i')
    cy.get('.vue-select').should('not.have.text', 'closing')
    cy.get('.vue-select').should('have.text', 'loading')

    cy.wait(100)
    cy.get('.vue-select').should('have.text', 'closing')
    cy.get('.vue-select').should('not.have.text', 'loading')
  })
})

context('loading (searchable + taggable)', () => {
  it('should pass isLoading', () => {
    cy.visit(path.join(__dirname, 'taggable.html'))
    cy.get('.vue-select').should('have.text', 'closing')
    cy.get('.vue-select').should('not.have.text', 'loading')

    cy.get('.vue-select').click()
    cy.get('.vue-select').should('have.text', 'opening')
    cy.get('.vue-select').should('not.have.text', 'loading')

    cy.get('input').last().type('i')
    cy.get('.vue-select').should('have.text', 'opening')
    cy.get('.vue-select').should('have.text', 'loading')

    cy.wait(100)
    cy.get('.vue-select').should('have.text', 'opening')
    cy.get('.vue-select').should('not.have.text', 'loading')
  })
})
