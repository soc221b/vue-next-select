/// <reference types="cypress" />
import path from 'path'

context('disabled group', () => {
  it('all of values should be disabled if group is disabled', () => {
    cy.visit(path.join(__dirname, 'disabled-by-group.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown-item.disabled').should('have.length', 3)
    cy.get('.vue-dropdown-item').last().should('not.have.class', 'disabled')
  })

  it("should be disabled if all of group's value are disabled", () => {
    cy.visit(path.join(__dirname, 'disabled-by-values.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown-item.group.disabled').should('have.length', 1)
  })
})
