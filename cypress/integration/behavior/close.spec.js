context('close', () => {
  it('should close', () => {
    cy.visit('/cypress/fixtures/open-and-close/without-searchable-and-taggable.html')

    cy.get('.vue-select').click()
    cy.get('.icon.arrow-downward').click()
    cy.get('.vue-dropdown').should('not.exist')
  })

  it('should close when using searchable prop', () => {
    cy.visit('/cypress/fixtures/open-and-close/with-searchable.html')

    cy.get('.vue-select').click()
    cy.get('.icon.arrow-downward').click()
    cy.get('.vue-dropdown').should('not.exist')
  })

  it('should close when using taggable prop', () => {
    cy.visit('/cypress/fixtures/open-and-close/with-taggable.html')

    cy.get('.vue-select').click()
    cy.get('.icon.arrow-downward').click()
    cy.get('.vue-dropdown').should('not.exist')
  })

  it('should close when using searchable and taggable prop', () => {
    cy.visit('/cypress/fixtures/open-and-close/with-searchable-and-taggable.html')

    cy.get('.vue-select').click()
    cy.get('.icon.arrow-downward').click()
    cy.get('.vue-dropdown').should('not.exist')
  })
})
