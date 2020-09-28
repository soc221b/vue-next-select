context('tabindex', () => {
  it('should tab backward', () => {
    cy.visit('/cypress/fixtures/tabindex/with-taggable.html')

    cy.get('.vue-select').click()
    cy.get('#button1').should('not.be.focused')
    cy.get('.vue-dropdown').should('be.visible')

    cy.focused().tab({ shift: true })
    cy.get('#button1').should('be.focused')
    cy.get('.vue-dropdown').should('not.be.visible')

    cy.focused().tab()
    cy.get('#button1').should('not.be.focused')
    cy.get('.vue-dropdown').should('be.visible')

    cy.focused().tab()
    cy.get('#button2').should('be.focused')
    cy.get('.vue-dropdown').should('not.be.visible')

    cy.focused().tab({ shift: true })
    cy.get('#button1').should('not.be.focused')
    cy.get('.vue-dropdown').should('be.visible')
  })

  it('should tab backward', () => {
    cy.visit('/cypress/fixtures/tabindex/without-taggable.html')

    cy.get('.vue-select').click()
    cy.get('#button1').should('not.be.focused')
    cy.get('.vue-dropdown').should('be.visible')

    cy.focused().tab({ shift: true })
    cy.get('#button1').should('be.focused')
    cy.get('.vue-dropdown').should('not.be.visible')

    cy.focused().tab()
    cy.get('#button1').should('not.be.focused')
    cy.get('.vue-dropdown').should('be.visible')

    cy.focused().tab()
    cy.get('#button2').should('be.focused')
    cy.get('.vue-dropdown').should('not.be.visible')

    cy.focused().tab({ shift: true })
    cy.get('#button1').should('not.be.focused')
    cy.get('.vue-dropdown').should('be.visible')
  })
})
