/// <reference types="cypress" />
import path from 'path'

context('option', () => {
  // https://www.w3.org/TR/wai-aria-1.1/#option

  it('should set aria-selected to true when one option is selected', () => {
    cy.visit(path.join(__dirname, 'index.html'))
    cy.get('[aria-owns="vs1-listbox"]').click()

    cy.get('[id="vs1-option-0"]').click()

    cy.get('[id="vs1-option-0"]').should('have.attr', 'aria-selected', 'true')
  })

  it('should set aria-selected to false when one option is not selected', () => {
    cy.visit(path.join(__dirname, 'index.html'))
    cy.get('[aria-owns="vs1-listbox"]').click()

    cy.get('[id="vs1-option-0"]').should('have.attr', 'aria-selected', 'false')
  })

  it('should set aria-selected to true when one option is selected even that option is disabled', () => {
    cy.visit(path.join(__dirname, 'index.html'))
    cy.get('[aria-owns="vs1-listbox"]').click()

    cy.get('[id="vs1-option-3"]').should('have.attr', 'aria-selected', 'true')
  })

  it('should not aria-selected when one option is not selected and is disabled', () => {
    cy.visit(path.join(__dirname, 'index.html'))
    cy.get('[aria-owns="vs1-listbox"]').click()

    cy.get('[id="vs1-option-0"]').click()

    cy.get('[id="vs1-option-3"]').should('not.have.attr', 'aria-selected')
  })

  it('should set aria-disabled when one option is disabled', () => {
    cy.visit(path.join(__dirname, 'index.html'))
    cy.get('[aria-owns="vs1-listbox"]').click()

    cy.get('[id="vs1-option-3"]').should('have.attr', 'aria-disabled', 'true')
  })
})
