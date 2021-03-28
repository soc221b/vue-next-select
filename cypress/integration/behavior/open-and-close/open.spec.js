/// <reference types="cypress" />
import path from 'path'

context('open', () => {
  it('should open without searchable and taggable', () => {
    cy.visit(path.join(__dirname, 'without-searchable-and-taggable.html'))

    cy.get('.vue-select').click()
    cy.get('.vue-dropdown').should('be.visible')
  })

  it('should open after clicking arrow downward icon', () => {
    cy.visit(path.join(__dirname, 'without-searchable-and-taggable.html'))

    cy.get('.icon.arrow-downward').click()
    cy.get('.vue-dropdown').should('be.visible')
  })

  it('should keep open after clicking inside', () => {
    cy.visit(path.join(__dirname, 'without-searchable-and-taggable.html'))

    cy.get('.vue-select').click()
    cy.get('.vue-select').click()
    cy.get('.vue-dropdown').should('be.visible')
  })

  it('should open when using searchable prop', () => {
    cy.visit(path.join(__dirname, 'with-searchable.html'))

    cy.get('.vue-select').click()
    cy.get('.vue-dropdown').should('be.visible')
  })

  it('should open when using taggable prop', () => {
    cy.visit(path.join(__dirname, 'with-taggable.html'))

    cy.get('.vue-select').click()
    cy.get('.vue-dropdown').should('be.visible')
  })

  it('should keep open when using taggable prop after remove tag', () => {
    cy.visit(path.join(__dirname, 'with-taggable.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-tag.selected').children().filter('.icon.delete').click({ multiple: true })
    cy.get('.vue-dropdown').should('be.visible')
  })

  it('should open when using searchable and taggable prop', () => {
    cy.visit(path.join(__dirname, 'with-searchable-and-taggable.html'))

    cy.get('.vue-select').click()
    cy.get('.vue-dropdown').should('be.visible')
  })

  it('should keep open when using searchable and taggable prop after remove tag', () => {
    cy.visit(path.join(__dirname, 'with-searchable-and-taggable.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-tag.selected').children().filter('.icon.delete').click({ multiple: true })
    cy.get('.vue-dropdown').should('be.visible')
  })
})
