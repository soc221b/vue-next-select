/// <reference types="cypress" />
import path from 'path'

context('tab', () => {
  it('should tab', () => {
    cy.visit(path.join(__dirname, 'with-taggable.html'))

    cy.get('.vue-select').click()
    cy.get('input').should('be.focused')

    cy.focused().tab({ shift: true })
    cy.get('#previous-button').should('be.focused')

    cy.focused().tab()
    cy.get('input').should('be.focused')

    cy.focused().tab()
    cy.get('#next-button').should('be.focused')

    cy.focused().tab({ shift: true })
    cy.get('input').should('be.focused')
  })

  it('should tab', () => {
    cy.visit(path.join(__dirname, 'without-taggable.html'))

    cy.get('.vue-select').click()
    cy.get('input').should('be.focused')

    cy.focused().tab({ shift: true })
    cy.get('#previous-button').should('be.focused')

    cy.focused().tab()
    cy.get('input').should('be.focused')

    cy.focused().tab()
    cy.get('#next-button').should('be.focused')

    cy.focused().tab({ shift: true })
    cy.get('input').should('be.focused')
  })
})
