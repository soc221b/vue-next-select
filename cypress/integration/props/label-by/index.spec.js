/// <reference types="cypress" />
import path from 'path'

context('label-by', () => {
  it('should use whole object as label', () => {
    cy.visit(path.join(__dirname, 'without.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown-item.selected').should(
      'have.text',
      `
{
  "deep": {
    "label": "I",
    "value": "i"
  }
}
      `.trim(),
    )
  })

  it('should works with path', () => {
    cy.visit(path.join(__dirname, 'with-path.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown-item.selected').should('have.text', 'I')
  })

  it('should works with function', () => {
    cy.visit(path.join(__dirname, 'with-function.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown-item.selected').should('have.text', 'I')
  })
})
