/// <reference types="cypress" />
import path from 'path'

context('listbox', () => {
  // https://www.w3.org/TR/wai-aria-1.1/#listbox

  it('should set aria-busy to true when loading options', () => {
    cy.visit(path.join(__dirname, 'loading.html'))

    cy.get('[id="vs1-listbox"]').should('have.attr', 'aria-busy', 'true')
  })
})
