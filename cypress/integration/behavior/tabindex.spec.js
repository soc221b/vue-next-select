context('tabindex', () => {
  it('should tab backward', () => {
    cy.visit('/cypress/fixtures/tabindex/with-taggable.html')

    cy.get('.vue-select').click()
    cy.get('#previous-button').should('not.be.focused')
    cy.get('.vue-dropdown').should('be.visible')

    cy.focused().tab({ shift: true })
    cy.get('#previous-button').should('be.focused')
    cy.get('.vue-dropdown').should('not.be.visible')

    cy.focused().tab()
    cy.get('#previous-button').should('not.be.focused')
    cy.get('.vue-dropdown').should('be.visible')

    cy.focused().tab()
    cy.get('#next-button').should('be.focused')
    cy.get('.vue-dropdown').should('not.be.visible')

    cy.focused().tab({ shift: true })
    cy.get('#previous-button').should('not.be.focused')
    cy.get('.vue-dropdown').should('be.visible')
  })

  it('should tab backward', () => {
    cy.visit('/cypress/fixtures/tabindex/without-taggable.html')

    cy.get('.vue-select').click()
    cy.get('#previous-button').should('not.be.focused')
    cy.get('.vue-dropdown').should('be.visible')

    cy.focused().tab({ shift: true })
    cy.get('#previous-button').should('be.focused')
    cy.get('.vue-dropdown').should('not.be.visible')

    cy.focused().tab()
    cy.get('#previous-button').should('not.be.focused')
    cy.get('.vue-dropdown').should('be.visible')

    cy.focused().tab()
    cy.get('#next-button').should('be.focused')
    cy.get('.vue-dropdown').should('not.be.visible')

    cy.focused().tab({ shift: true })
    cy.get('#previous-button').should('not.be.focused')
    cy.get('.vue-dropdown').should('be.visible')
  })
})
