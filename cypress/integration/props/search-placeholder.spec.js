/// <reference types="cypress" />

context('search-placeholder', () => {
  it('should have default placeholder', () => {
    cy.visit('/cypress/fixtures/search-placeholder/without.html')
    cy.get('.vue-select').click()

    cy.get('.vue-select').should('contain.html', 'Type to search')
  })

  it('can customize placeholder', () => {
    cy.visit('/cypress/fixtures/search-placeholder/with.html')
    cy.get('.vue-select').click()

    cy.get('.vue-select').should('contain.html', 'Search something')
  })
})
