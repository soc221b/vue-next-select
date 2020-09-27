/// <reference types="cypress" />

context('close-on-select (single)', () => {
  it('should not close on select', () => {
    cy.visit('/cypress/fixtures/close-on-select/single/without.html')
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').children().first().next().click()
    cy.get('.vue-dropdown').should('exist')
  })

  it('should not close on remove', () => {
    cy.visit('/cypress/fixtures/close-on-select/single/without.html')
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').children().first().click()
    cy.get('.vue-dropdown').should('exist')
  })

  it('should close on select', () => {
    cy.visit('/cypress/fixtures/close-on-select/single/with.html')
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').children().first().next().click()
    cy.get('.vue-dropdown').should('not.exist')
  })

  it('should close on remove', () => {
    cy.visit('/cypress/fixtures/close-on-select/single/with.html')
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').children().first().click()
    cy.get('.vue-dropdown').should('not.exist')
  })
})

context('close-on-select (multiple)', () => {
  it('should not close on select', () => {
    cy.visit('/cypress/fixtures/close-on-select/multiple/without.html')
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').children().first().next().click()
    cy.get('.vue-dropdown').should('exist')
  })

  it('should not close on remove', () => {
    cy.visit('/cypress/fixtures/close-on-select/multiple/without.html')
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').children().first().click()
    cy.get('.vue-dropdown').should('exist')
  })

  it('should close on select', () => {
    cy.visit('/cypress/fixtures/close-on-select/multiple/with.html')
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').children().first().next().click()
    cy.get('.vue-dropdown').should('not.exist')
  })

  it('should close on remove', () => {
    cy.visit('/cypress/fixtures/close-on-select/multiple/with.html')
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').children().first().click()
    cy.get('.vue-dropdown').should('not.exist')
  })
})
