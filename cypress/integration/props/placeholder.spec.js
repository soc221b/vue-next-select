/// <reference types="cypress" />

context('placeholder', () => {
  it('should have default placeholder', () => {
    cy.visit('/cypress/fixtures/placeholder/without.html')
    cy.get('.vue-select').click()

    cy.get('.vue-select').should('contain.html', 'Select option')
  })

  it('can customize placeholder', () => {
    cy.visit('/cypress/fixtures/placeholder/with.html')
    cy.get('.vue-select').click()

    cy.get('.vue-select').should('contain.html', 'Pick option')
  })
})
