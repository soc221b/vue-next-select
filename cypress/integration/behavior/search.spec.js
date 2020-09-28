/// <reference types="cypress" />

context('search', () => {
  it('should keep searching text after select option', () => {
    cy.visit('/cypress/fixtures/search/index.html')
    cy.get('.vue-select').click()

    cy.focused().type('e')
    cy.focused().should('have.value', 'e')

    cy.get('.vue-dropdown').children().click({ multiple: true })
    cy.focused().should('have.value', 'e')
  })

  it('should keep searching text after removing selected option', () => {
    cy.visit('/cypress/fixtures/search/index.html')
    cy.get('.vue-select').click()

    cy.focused().type('e')
    cy.focused().should('have.value', 'e')

    cy.get('.vue-dropdown').children().click({ multiple: true })
    cy.get('.vue-tag.selected').children().filter('.icon.delete').click({ multiple: true })
    cy.focused().should('have.value', 'e')
  })
})
