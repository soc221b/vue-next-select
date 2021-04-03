/// <reference types="cypress" />
import path from 'path'

context('disabled (single)', () => {
  it('should not be disabled', () => {
    cy.visit(path.join(__dirname, 'single/without.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').should('be.visible')
  })

  it('should be disabled', () => {
    cy.visit(path.join(__dirname, 'single/with.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').should('not.be.visible')
  })

  it('should not open after clicking arrow downward icon', () => {
    cy.visit(path.join(__dirname, 'single/with.html'))

    cy.get('.icon.arrow-downward').click()
    cy.get('.vue-dropdown').should('not.be.visible')
  })
})

context('disabled (multiple)', () => {
  it('should not be disabled', () => {
    cy.visit(path.join(__dirname, 'multiple/without.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').should('be.visible')
  })

  it('should be disabled', () => {
    cy.visit(path.join(__dirname, 'multiple/with.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown').should('not.be.visible')
  })

  it('should not open after clicking arrow downward icon', () => {
    cy.visit(path.join(__dirname, 'multiple/with.html'))

    cy.get('.icon.arrow-downward').click()
    cy.get('.vue-dropdown').should('not.be.visible')
  })
})

context('disabled (taggable)', () => {
  it('should not be disabled', () => {
    cy.visit(path.join(__dirname, 'taggable/without.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-tags .icon').first().click()
    cy.get('.vue-tags').children().first().should('not.have.class', 'selected')
  })

  it('should be disabled', () => {
    cy.visit(path.join(__dirname, 'taggable/with.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-tags .icon').first().click()
    cy.get('.vue-tags').children().first().should('have.class', 'selected')
  })

  it('should not open after clicking arrow downward icon', () => {
    cy.visit(path.join(__dirname, 'taggable/with.html'))

    cy.get('.icon.arrow-downward').click()
    cy.get('.vue-dropdown').should('not.be.visible')
  })
})
