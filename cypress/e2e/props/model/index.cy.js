/// <reference types="cypress" />
import path from 'path'

context('model', () => {
  it('should update when model changed', () => {
    cy.visit(path.join(__dirname, 'single/change-model.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown-item.selected').should('have.length', 0)

    cy.get('#previous-button').click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 1)
    cy.get('.vue-dropdown-item').first().should('have.class', 'selected')

    cy.get('#previous-button').click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 1)
    cy.get('.vue-dropdown-item').first().next().should('have.class', 'selected')

    cy.get('#previous-button').click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 1)
    cy.get('.vue-dropdown-item').first().next().next().should('have.class', 'selected')

    cy.get('#previous-button').click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 0)
  })

  it('should update when model changed (object)', () => {
    cy.visit(path.join(__dirname, 'single/change-model-with-object.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown-item.selected').should('have.length', 0)

    cy.get('#previous-button').click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 1)
    cy.get('.vue-dropdown-item').first().should('have.class', 'selected')

    cy.get('#previous-button').click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 1)
    cy.get('.vue-dropdown-item').first().next().should('have.class', 'selected')

    cy.get('#previous-button').click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 1)
    cy.get('.vue-dropdown-item').first().next().next().should('have.class', 'selected')

    cy.get('#previous-button').click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 0)
  })
})

context('model (multiple)', () => {
  it('should update when model changed', () => {
    cy.visit(path.join(__dirname, 'multiple/change-model.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown-item.selected').should('have.length', 0)
    cy.get('.vue-tag.selected').should('have.length', 0)

    cy.get('#previous-button').click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 1)
    cy.get('.vue-tag.selected').should('have.length', 1)

    cy.get('#previous-button').click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 2)
    cy.get('.vue-tag.selected').should('have.length', 2)

    cy.get('#previous-button').click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 3)
    cy.get('.vue-tag.selected').should('have.length', 3)

    cy.get('#previous-button').click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 0)
    cy.get('.vue-tag.selected').should('have.length', 0)
  })

  it('should update when model changed (object)', () => {
    cy.visit(path.join(__dirname, 'multiple/change-model-with-object.html'))
    cy.get('.vue-select').click()

    cy.get('.vue-dropdown-item.selected').should('have.length', 0)
    cy.get('.vue-tag.selected').should('have.length', 0)

    cy.get('#previous-button').click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 1)
    cy.get('.vue-tag.selected').should('have.length', 1)

    cy.get('#previous-button').click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 2)
    cy.get('.vue-tag.selected').should('have.length', 2)

    cy.get('#previous-button').click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 3)
    cy.get('.vue-tag.selected').should('have.length', 3)

    cy.get('#previous-button').click()
    cy.get('.vue-dropdown-item.selected').should('have.length', 0)
    cy.get('.vue-tag.selected').should('have.length', 0)
  })
})
