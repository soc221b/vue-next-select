/// <reference types="cypress" />

context('disabled (single)', () => {
  it('should not be disabled', () => {
    cy.visit('/cypress/fixtures/disabled/single/without.html')
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').should('be.visible')
  })

  it('should be disabled', () => {
    cy.visit('/cypress/fixtures/disabled/single/with.html')
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').should('not.be.visible')
  })

  it('should not open after clicking arrow downward icon', () => {
    cy.visit('/cypress/fixtures/disabled/single/with.html')

    cy.get('.icon.arrow-downward').click()
    cy.get('.vue-dropdown').should('not.be.visible')
  })
})

context('disabled (multiple)', () => {
  it('should not be disabled', () => {
    cy.visit('/cypress/fixtures/disabled/multiple/without.html')
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').should('be.visible')
  })

  it('should be disabled', () => {
    cy.visit('/cypress/fixtures/disabled/multiple/with.html')
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').should('not.be.visible')
  })

  it('should not open after clicking arrow downward icon', () => {
    cy.visit('/cypress/fixtures/disabled/multiple/with.html')

    cy.get('.icon.arrow-downward').click()
    cy.get('.vue-dropdown').should('not.be.visible')
  })
})

context('disabled (taggable)', () => {
  it('should not be disabled', () => {
    cy.visit('/cypress/fixtures/disabled/taggable/without.html')
    cy.get('.vue-select').click()

    cy.get('.vue-tags').children().first().click()
    cy.get('.vue-tags').children().first().should('not.have.class', 'selected')
  })

  it('should be disabled', () => {
    cy.visit('/cypress/fixtures/disabled/taggable/with.html')
    cy.get('.vue-select').click()

    cy.get('.vue-tags').children().first().click()
    cy.get('.vue-tags').children().first().should('have.class', 'selected')
  })

  it('should not open after clicking arrow downward icon', () => {
    cy.visit('/cypress/fixtures/disabled/taggable/with.html')

    cy.get('.icon.arrow-downward').click()
    cy.get('.vue-dropdown').should('not.be.visible')
  })
})
