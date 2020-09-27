/// <reference types="cypress" />

context('hide-selected', () => {
  it('should not hide selected on init', () => {
    cy.visit('/cypress/fixtures/hide-selected/without.html')
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').children().should('have.length', 3)
  })

  it('should not hide selected after selecting option', () => {
    cy.visit('/cypress/fixtures/hide-selected/without.html')
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').children().first().next().click()
    cy.get('.vue-dropdown').children().should('have.length', 3)
  })

  it('should hide selected on init', () => {
    cy.visit('/cypress/fixtures/hide-selected/with.html')
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').children().should('have.length', 2)
  })

  it('should hide selected after selecting option', () => {
    cy.visit('/cypress/fixtures/hide-selected/with.html')
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').children().first().next().click()
    cy.get('.vue-dropdown').children().should('have.length', 1)
  })

  it('should not hide after removing option', () => {
    cy.visit('/cypress/fixtures/hide-selected/with.html')
    cy.get('.vue-select').click()

    cy.get('.vue-tags').children().first().click()
    cy.get('.vue-dropdown').children().should('have.length', 3)
  })
})
