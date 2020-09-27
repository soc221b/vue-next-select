/// <reference types="cypress" />

context('open event', () => {
  it('should not fire open event after removing option', () => {
    cy.visit('/cypress/fixtures/events/open.html')
    cy.get('.vue-select').click()

    return new Cypress.Promise((resolve, reject) => {
      cy.document().then(document => {
        document.documentElement.addEventListener('custom-event', reject)
        cy.get('.vue-dropdown').children().first().next().click()
        resolve()
      })
    })
  })

  it('should not fire open event after adding option', () => {
    cy.visit('/cypress/fixtures/events/open.html')
    cy.get('.vue-select').click()

    return new Cypress.Promise((resolve, reject) => {
      cy.document().then(document => {
        document.documentElement.addEventListener('custom-event', reject)
        cy.get('.vue-dropdown').children().first().next().click()
        resolve()
      })
    })
  })

  it('should not fire open event after removing option by click tag', () => {
    cy.visit('/cypress/fixtures/events/open.html')
    cy.get('.vue-select').click()

    return new Cypress.Promise((resolve, reject) => {
      cy.document().then(document => {
        document.documentElement.addEventListener('custom-event', reject)
        cy.get('.vue-tags').children().first().click()
        resolve()
      })
    })
  })

  it('should fire open event', () => {
    cy.visit('/cypress/fixtures/events/open.html')

    return new Cypress.Promise(resolve => {
      cy.document().then(document => {
        document.documentElement.addEventListener('custom-event', resolve)
        cy.get('.vue-select').click()
      })
    })
  })

  it('should fire open event after clicking arrow downward icon', () => {
    cy.visit('/cypress/fixtures/events/open.html')

    return new Cypress.Promise(resolve => {
      cy.document().then(document => {
        document.documentElement.addEventListener('custom-event', resolve)
        cy.get('.icon.arrow-downward').click()
      })
    })
  })
})
