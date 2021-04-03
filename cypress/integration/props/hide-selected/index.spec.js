/// <reference types="cypress" />
import path from 'path'

context('hide-selected', () => {
  it('should not hide selected on init', () => {
    cy.visit(path.join(__dirname, 'without.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').children().should('have.length', 3)
  })

  it('should not hide selected after selecting option', () => {
    cy.visit(path.join(__dirname, 'without.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').children().first().next().click()
    cy.get('.vue-dropdown').children().should('have.length', 3)
  })

  it('should hide selected on init', () => {
    cy.visit(path.join(__dirname, 'with.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').children().should('have.length', 2)
  })

  it('should hide selected after selecting option', () => {
    cy.visit(path.join(__dirname, 'with.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').children().first().next().click()
    cy.get('.vue-dropdown').children().should('have.length', 1)
  })

  it('should not hide after removing option', () => {
    cy.visit(path.join(__dirname, 'with.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-tags .icon').first().click()
    cy.get('.vue-dropdown').children().should('have.length', 3)
  })
})
