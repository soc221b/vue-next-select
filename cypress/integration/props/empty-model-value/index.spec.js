/// <reference types="cypress" />
import path from 'path'

context('empty-model-value', () => {
  it.only('should use null as default empty-model-value', () => {
    cy.visit(path.join(__dirname, 'default.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown-item.selected').click()
    cy.get('#modelValue').should('have.text', 'null')
  })

  it.only('should use empty string as empty-model-value', () => {
    cy.visit(path.join(__dirname, 'empty-string.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown-item.selected').click()
    cy.get('#modelValue').should('have.text', '<empty string>')
  })
})
