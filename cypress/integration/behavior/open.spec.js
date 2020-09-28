/// <reference types="cypress" />

context('open', () => {
  it('should open without searchable and taggable', () => {
    cy.visit('/cypress/fixtures/open-and-close/without-searchable-and-taggable.html')

    cy.get('.vue-select').click()
    cy.get('.vue-dropdown').should('be.visible')
  })

  it('should keep open after clicking inside', () => {
    cy.visit('/cypress/fixtures/open-and-close/without-searchable-and-taggable.html')

    cy.get('.vue-select').click()
    cy.get('.vue-select').click()
    cy.get('.vue-dropdown').should('be.visible')
  })

  it('should open when using searchable prop', () => {
    cy.visit('/cypress/fixtures/open-and-close/with-searchable.html')

    cy.get('.vue-select').click()
    cy.get('.vue-dropdown').should('be.visible')
  })

  it('should open when using taggable prop', () => {
    cy.visit('/cypress/fixtures/open-and-close/with-taggable.html')

    cy.get('.vue-select').click()
    cy.get('.vue-dropdown').should('be.visible')
  })

  it('should keep open when using taggable prop after remove tag', () => {
    cy.visit('/cypress/fixtures/open-and-close/with-taggable.html')
    cy.get('.vue-select').click()

    cy.get('.vue-tag.selected').children().filter('.icon.delete').click({ multiple: true })
    cy.get('.vue-dropdown').should('be.visible')
  })

  it('should open when using searchable and taggable prop', () => {
    cy.visit('/cypress/fixtures/open-and-close/with-searchable-and-taggable.html')

    cy.get('.vue-select').click()
    cy.get('.vue-dropdown').should('be.visible')
  })

  it('should keep open when using searchable and taggable prop after remove tag', () => {
    cy.visit('/cypress/fixtures/open-and-close/with-searchable-and-taggable.html')
    cy.get('.vue-select').click()

    cy.get('.vue-tag.selected').children().filter('.icon.delete').click({ multiple: true })
    cy.get('.vue-dropdown').should('be.visible')
  })
})
