/// <reference types="cypress" />
import path from 'path'

context('group-options', () => {
  it('should select values of group option when click an group option', () => {
    cy.visit(path.join(__dirname, 'index.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown-item.group').trigger('click')

    cy.get('.vue-dropdown-item.selected').should('have.length', 4)
  })

  it('should deselect values of group option when all of its values are selected', () => {
    cy.visit(path.join(__dirname, 'index.html'))
    cy.get('.vue-select').click()
    cy.get('.vue-dropdown-item.group').trigger('click')

    cy.get('.vue-dropdown-item.group').trigger('click')

    cy.get('.vue-dropdown-item.selected').should('have.length', 0)
  })

  it('group should be select if and only if all of its values are selected', () => {
    cy.visit(path.join(__dirname, 'index.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown-item:not(.group)').first().trigger('click').should('have.class', 'selected')
    cy.get('.vue-dropdown-item.group').should('not.have.class', 'selected')

    cy.get('.vue-dropdown-item:not(.group)').first().next().trigger('click').should('have.class', 'selected')
    cy.get('.vue-dropdown-item.group').should('not.have.class', 'selected')

    cy.get('.vue-dropdown-item:not(.group)').first().next().next().trigger('click').should('have.class', 'selected')
    cy.get('.vue-dropdown-item.group').should('have.class', 'selected')
  })
})
