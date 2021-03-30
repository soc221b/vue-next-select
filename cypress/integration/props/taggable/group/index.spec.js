/// <reference types="cypress" />
import path from 'path'

context('group', () => {
  it('should not show group option', () => {
    cy.visit(path.join(__dirname, 'index.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown-item.group').trigger('click')

    cy.get('.vue-tag.selected').should('have.length', 3)
  })
})
