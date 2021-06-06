/// <reference types="cypress" />
import path from 'path'

context('listbox', () => {
  // https://www.w3.org/TR/wai-aria-1.1/#listbox

  it('should set aria-multiselectable to true when multiple options can be selected', () => {
    cy.visit(path.join(__dirname, 'multiple.html'))

    cy.get('[id="vs1-listbox"]').should('have.attr', 'aria-multiselectable', 'true')
  })
})
