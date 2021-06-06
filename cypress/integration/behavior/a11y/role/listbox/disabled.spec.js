/// <reference types="cypress" />
import path from 'path'

context('listbox', () => {
  // https://www.w3.org/TR/wai-aria-1.1/#listbox

  it('should set aria-busy to true when disabled options', () => {
    cy.visit(path.join(__dirname, 'disabled.html'))

    cy.get('[id="vs1-listbox"]').should('have.attr', 'aria-disabled', 'true')
  })
})
