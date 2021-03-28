/// <reference types="cypress" />
import path from 'path'

context('close', () => {
  it('should close', () => {
    cy.visit(path.join(__dirname, 'without-searchable-and-taggable.html'))

    cy.get('.vue-select').click()
    cy.get('.icon.arrow-downward').click()
    cy.get('.vue-dropdown').should('not.be.visible')
  })

  it('should close on blur', () => {
    cy.visit(path.join(__dirname, 'without-searchable-and-taggable.html'))

    cy.get('.vue-select').click()
    cy.get('body').click()
    cy.get('.vue-dropdown').should('not.be.visible')
  })

  it('should close when using searchable prop', () => {
    cy.visit(path.join(__dirname, 'with-searchable.html'))

    cy.get('.vue-select').click()
    cy.get('.icon.arrow-downward').click()
    cy.get('.vue-dropdown').should('not.be.visible')
  })

  it('should close when using searchable prop', () => {
    cy.visit(path.join(__dirname, 'with-searchable.html'))

    cy.get('.vue-select').click()
    cy.get('body').click()
    cy.get('.vue-dropdown').should('not.be.visible')
  })

  it('should close when using taggable prop', () => {
    cy.visit(path.join(__dirname, 'with-taggable.html'))

    cy.get('.vue-select').click()
    cy.get('.icon.arrow-downward').click()
    cy.get('.vue-dropdown').should('not.be.visible')
  })

  it('should close when using taggable prop', () => {
    cy.visit(path.join(__dirname, 'with-taggable.html'))

    cy.get('.vue-select').click()
    cy.get('body').click()
    cy.get('.vue-dropdown').should('not.be.visible')
  })

  it('should close when using taggable prop', () => {
    cy.visit(path.join(__dirname, 'with-taggable.html'))

    cy.get('.vue-select').click()
    cy.get('.vue-dropdown').children().click({ multiple: true })
    cy.get('body').click()
    cy.get('.vue-tag.selected').children().first().click()
    cy.get('body').click()
    cy.get('.vue-dropdown').should('not.be.visible')
  })

  it('should close when using searchable and taggable prop', () => {
    cy.visit(path.join(__dirname, 'with-searchable-and-taggable.html'))

    cy.get('.vue-select').click()
    cy.get('.icon.arrow-downward').click()
    cy.get('.vue-dropdown').should('not.be.visible')
  })

  it('should close when using searchable and taggable prop', () => {
    cy.visit(path.join(__dirname, 'with-searchable-and-taggable.html'))

    cy.get('.vue-select').click()
    cy.get('body').click()
    cy.get('.vue-dropdown').should('not.be.visible')
  })
})
