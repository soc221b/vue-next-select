/// <reference types="cypress" />
import path from 'path'

context('kbd interaction', () => {
  // https://www.w3.org/TR/wai-aria-practices-1.1/#listbox_kbd_interaction

  it('if none of option is selected before focus, focus first opiton', () => {
    cy.visit(path.join(__dirname, 'multiple.html'))

    cy.get('[aria-owns="vs1-listbox"]').click()

    cy.get('[aria-owns="vs1-listbox"]').should('have.attr', 'aria-activedescendant', 'vs1-option-0')
  })

  it('if one or more are selected before focus, focus the selected opiton', () => {
    cy.visit(path.join(__dirname, 'multiple.html'))
    cy.get('[aria-owns="vs1-listbox"]').click()
    cy.get('[id="vs1-option-2"]').click()

    cy.get('[id="vs1-option-0"]').trigger('mousemove')
    cy.get('[aria-owns="vs1-listbox"]').should('have.attr', 'aria-activedescendant', 'vs1-option-0')
    cy.get('.icon.arrow-downward').click()
    cy.get('[aria-owns="vs1-listbox"]').click()

    cy.get('[aria-owns="vs1-listbox"]').should('have.attr', 'aria-activedescendant', 'vs1-option-2')
  })

  it('move focus to next option when enter down-arrow key', () => {
    cy.visit(path.join(__dirname, 'multiple.html'))
    cy.get('[aria-owns="vs1-listbox"]').click()
    cy.get('[aria-owns="vs1-listbox"]').should('have.attr', 'aria-activedescendant', 'vs1-option-0')

    cy.get('[aria-owns="vs1-listbox"]').trigger('keydown', { key: 'down' })

    cy.get('[aria-owns="vs1-listbox"]').should('have.attr', 'aria-activedescendant', 'vs1-option-1')
  })

  it('move focus to next option when enter up-arrow key', () => {
    cy.visit(path.join(__dirname, 'multiple.html'))
    cy.get('[aria-owns="vs1-listbox"]').click()
    cy.get('[aria-owns="vs1-listbox"]').should('have.attr', 'aria-activedescendant', 'vs1-option-0')

    cy.get('[aria-owns="vs1-listbox"]').trigger('keydown', { key: 'up' })

    cy.get('[aria-owns="vs1-listbox"]').should('have.attr', 'aria-activedescendant', 'vs1-option-2')
  })

  it('move focus to first option when enter the home key', () => {
    cy.visit(path.join(__dirname, 'multiple.html'))
    cy.get('[aria-owns="vs1-listbox"]').click()
    cy.get('[id="vs1-option-2"]').trigger('mousemove')
    cy.get('[aria-owns="vs1-listbox"]').should('have.attr', 'aria-activedescendant', 'vs1-option-2')

    cy.get('[aria-owns="vs1-listbox"]').trigger('keydown', { key: 'home' })

    cy.get('[aria-owns="vs1-listbox"]').should('have.attr', 'aria-activedescendant', 'vs1-option-0')
  })

  it('move focus to last option when enter the end key', () => {
    cy.visit(path.join(__dirname, 'multiple.html'))
    cy.get('[aria-owns="vs1-listbox"]').click()
    cy.get('[aria-owns="vs1-listbox"]').should('have.attr', 'aria-activedescendant', 'vs1-option-0')

    cy.get('[aria-owns="vs1-listbox"]').trigger('keydown', { key: 'end' })

    cy.get('[aria-owns="vs1-listbox"]').should('have.attr', 'aria-activedescendant', 'vs1-option-2')
  })

  it('move focus to matched option when type some charachars', () => {
    cy.visit(path.join(__dirname, 'multiple.html'))
    cy.get('[aria-owns="vs1-listbox"]').click()
    cy.get('[aria-owns="vs1-listbox"]').should('have.attr', 'aria-activedescendant', 'vs1-option-0')

    cy.get('[aria-owns="vs1-listbox"]').trigger('keydown', { key: 'v' })

    cy.get('[aria-owns="vs1-listbox"]').should('have.attr', 'aria-activedescendant', 'vs1-option-2')
  })
})
