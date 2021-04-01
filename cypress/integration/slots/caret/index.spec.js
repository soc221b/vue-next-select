/// <reference types="cypress" />
import path from 'path'

context('caret (searchable)', () => {
  it('should pass isFocusing', () => {
    cy.visit(path.join(__dirname, 'index.html'))

    cy.get('.vue-select').should('have.text', 'closing')

    cy.get('.vue-select').click()
    cy.get('.vue-select').should('have.text', 'opening')
  })

  it('should pass isLoading', () => {
    cy.visit(path.join(__dirname, 'index.html'))

    cy.get('.vue-select').should('have.text', 'closing')

    cy.get('input').type('i')
    cy.get('.vue-select').should('have.text', 'loading')

    cy.wait(100)
    cy.get('.vue-select').should('have.text', 'opening')
  })

  it('should pass toggle', () => {
    cy.visit(path.join(__dirname, 'index.html'))
    cy.get('.vue-select').click()
    cy.get('.vue-select').should('have.text', 'opening')

    cy.get('.caret').click()

    cy.get('.vue-select').should('have.text', 'closing')
  })
})

context('caret (searchable + taggable)', () => {
  it('should pass isFocusing', () => {
    cy.visit(path.join(__dirname, 'taggable.html'))

    cy.get('.vue-select').should('have.text', 'closing')

    cy.get('.vue-select').click()

    cy.get('.vue-select').should('have.text', 'opening')
  })

  it('should pass isLoading', () => {
    cy.visit(path.join(__dirname, 'taggable.html'))
    cy.get('.vue-select').click()

    cy.get('input').last().type('i')

    cy.get('.vue-select').should('have.text', 'loading')

    cy.wait(100)
    cy.get('.vue-select').should('have.text', 'opening')
  })

  it('should pass toggle', () => {
    cy.visit(path.join(__dirname, 'taggable.html'))
    cy.get('.vue-select').click()

    cy.get('.caret').click()

    cy.get('.vue-select').should('have.text', 'closing')
  })
})
