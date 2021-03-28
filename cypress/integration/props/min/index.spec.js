/// <reference types="cypress" />
import path from 'path'

context('min (single)', () => {
  it('can be removed by default', () => {
    cy.visit(path.join(__dirname, 'single-without-min.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').children().first().click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 0)
  })

  it('should not be removed', () => {
    cy.visit(path.join(__dirname, 'single-with-min.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').children().first().click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 1)
  })
})

context('min (multiple)', () => {
  it('can be removed by default', () => {
    cy.visit(path.join(__dirname, 'without.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').children().first().click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 0)
  })

  it('should not be removed', () => {
    cy.visit(path.join(__dirname, 'with.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').children().first().click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 1)

    cy.get('.vue-dropdown').children().first().next().click()
    cy.get('.vue-dropdown').children().first().next().click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 2)

    cy.get('.vue-dropdown').children().first().next().next().click()
    cy.get('.vue-dropdown').children().first().next().next().click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 2)
  })
})
