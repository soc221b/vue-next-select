context('focus', () => {
  it('should focus', () => {
    cy.visit('/cypress/fixtures/focus/with-taggable.html')

    cy.get('.vue-select').click()
    cy.get('#button1').should('not.be.focused')
    cy.get('input').should('be.focused')

    cy.focused().tab({ shift: true })
    cy.get('#button1').should('be.focused')
    cy.get('input').should('not.be.focused')

    cy.focused().tab()
    cy.get('#button1').should('not.be.focused')
    cy.get('input').should('be.focused')

    cy.focused().tab()
    cy.get('#button2').should('be.focused')
    cy.get('input').should('not.be.focused')

    cy.focused().tab({ shift: true })
    cy.get('#button1').should('not.be.focused')
    cy.get('input').should('be.focused')
  })

  it('should focus', () => {
    cy.visit('/cypress/fixtures/focus/without-taggable.html')

    cy.get('.vue-select').click()
    cy.get('#button1').should('not.be.focused')
    cy.get('input').should('be.focused')

    cy.focused().tab({ shift: true })
    cy.get('#button1').should('be.focused')
    cy.get('input').should('not.be.focused')

    cy.focused().tab()
    cy.get('#button1').should('not.be.focused')
    cy.get('input').should('be.focused')

    cy.focused().tab()
    cy.get('#button2').should('be.focused')
    cy.get('input').should('not.be.focused')

    cy.focused().tab({ shift: true })
    cy.get('#button1').should('not.be.focused')
    cy.get('input').should('be.focused')
  })
})
