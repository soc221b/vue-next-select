/// <reference types="cypress" />

context('label-by', () => {
  it('should use whole object as label', () => {
    cy.visit('/cypress/fixtures/label-by/without.html')
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
    cy.visit('/cypress/fixtures/label-by/with-path.html')
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown-item.selected').should('have.text', 'I')
  })

  it('should works with function', () => {
    cy.visit('/cypress/fixtures/label-by/with-function.html')
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown-item.selected').should('have.text', 'I')
  })
})
