/// <reference types="cypress" />
import path from 'path'

context('searchable', () => {
  it('should not be searchable by default', () => {
    cy.visit(path.join(__dirname, 'without.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-select').should('not.contain.html', 'Type to search')
  })

  it('should open dropdown', () => {
    cy.visit(path.join(__dirname, 'without.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').should('have.length', 1)
  })

  it('should open dropdown', () => {
    cy.visit(path.join(__dirname, 'with.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').should('have.length', 1)
  })

  it('filter typing value', () => {
    cy.visit(path.join(__dirname, 'with.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-input').type('i')
    cy.get('.vue-dropdown-item').should('have.length', 1)
  })

  it('filter typing value by label by default', () => {
    cy.visit(path.join(__dirname, 'default.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-input').type('Rails')
    cy.get('.vue-dropdown-item').should('have.length', 1)
  })

  it('filter typing value (ignore case) by label by default', () => {
    cy.visit(path.join(__dirname, 'default.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-input').type('RAILS')
    cy.get('.vue-dropdown-item').should('have.length', 1)
  })
})
