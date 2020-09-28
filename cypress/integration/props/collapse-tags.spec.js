/// <reference types="cypress" />

context('collapse-tags', () => {
  it('should not collapse tags by default', () => {
    cy.visit('/cypress/fixtures/collapse-tags/without.html')
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').children().click({ multiple: true })
    cy.get('.vue-tags').should('not.have.class', 'collapsed')
  })

  it('should collapse tags', () => {
    cy.visit('/cypress/fixtures/collapse-tags/with.html')
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').children().click({ multiple: true })
    cy.get('.vue-tags').should('have.class', 'collapsed')
  })
})
