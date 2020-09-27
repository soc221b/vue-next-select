/// <reference types="cypress" />

context('1', () => {
  it('should keep searching input after hide selected', () => {
    cy.visit('/cypress/fixtures/complex-use-case/1.html')
    cy.get('.vue-select').click()

    cy.get('input:not([disabled])').type('e')
    cy.get('input:not([disabled])').should('have.value', 'e')
    cy.get('.vue-dropdown-item').should('have.length', 2)

    cy.get('.vue-dropdown-item').first().click()
    cy.get('input:not([disabled])').should('have.value', 'e')
    cy.get('.vue-dropdown-item').should('have.length', 1)

    cy.get('.vue-dropdown-item').first().click()
    cy.get('input:not([disabled])').should('have.value', 'e')
    cy.get('.vue-dropdown-item').should('have.length', 0)

    cy.get('input:not([disabled])').type('{backspace}')
    cy.get('.vue-dropdown-item').should('have.length', 1)

    cy.get('.vue-dropdown-item').first().click()
    cy.get('.vue-dropdown-item').should('have.length', 0)

    cy.get('.vue-tag.selected').children().filter('.delete').first().click()
    cy.get('.vue-tag.selected').should('have.length', 2)
    cy.get('.vue-dropdown-item').should('have.length', 1)

    cy.get('.vue-tag.selected').children().filter('.delete').first().click()
    cy.get('.vue-tag.selected').should('have.length', 1)
    cy.get('.vue-dropdown-item').should('have.length', 2)

    cy.get('.vue-tag.selected').children().filter('.delete').first().click()
    cy.get('.vue-tag.selected').should('have.length', 0)
    cy.get('.vue-dropdown-item').should('have.length', 3)
  })
})
