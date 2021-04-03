/// <reference types="cypress" />
import path from 'path'

context('options', () => {
  it('should keep valid selected values after options has changed', () => {
    cy.visit(path.join(__dirname, 'change-options.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown-item.selected').should('have.length', 1)

    cy.get('input').type('i')
    cy.get('.vue-dropdown-item.selected').should('have.length', 1)

    cy.get('input').type('{backspace}')
    cy.get('.vue-dropdown-item.selected').should('have.length', 1)

    cy.get('input').type('e')
    cy.get('.vue-dropdown-item.selected').should('have.length', 0)

    cy.get('input').type('{backspace}')
    cy.get('.vue-dropdown-item.selected').should('have.length', 0)
  })

  it('should keep valid selected values after options has changed (object)', () => {
    cy.visit(path.join(__dirname, 'change-options-with-object.html'))

    cy.get('.vue-select').click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 1)

    cy.get('#remove-unselected-options').click()
    cy.get('.vue-select').click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 1)

    cy.get('#remove-selected-options').click()
    cy.get('.vue-select').click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 0)

    cy.get('#reset-options').click()
    cy.get('.vue-select').click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 0)
  })

  it('should not be able to select disabled option', () => {
    cy.visit(path.join(__dirname, 'disabled-options.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown-item.disabled').should('have.length', 1)
    cy.get('.vue-dropdown-item.selected').should('have.length', 0)

    cy.get('.vue-dropdown-item.disabled').click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 0)
    cy.get('.vue-dropdown-item').first().next().next().should('not.have.class', 'selected')
  })
})
