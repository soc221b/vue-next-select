/// <reference types="cypress" />

context('blur event', () => {
  it('should not fire blur event after adding option', () => {
    cy.visit('/cypress/fixtures/events/blur.html')
    cy.get('.vue-select').click()

    return new Cypress.Promise((resolve, reject) => {
      cy.document().then(document => {
        document.documentElement.removeEventListener('blur-custom-event', reject)
        document.documentElement.addEventListener('blur-custom-event', reject)
        cy.get('.vue-dropdown').children().first().next().click()
        resolve()
      })
    })
  })

  it('should not fire blur event after removing option', () => {
    cy.visit('/cypress/fixtures/events/blur.html')
    cy.get('.vue-select').click()

    return new Cypress.Promise((resolve, reject) => {
      cy.document().then(document => {
        document.documentElement.removeEventListener('blur-custom-event', reject)
        document.documentElement.addEventListener('blur-custom-event', reject)
        cy.get('.vue-dropdown').children().first().click()
        resolve()
      })
    })
  })

  it('should not fire blur event after removing option by clicking tag', () => {
    cy.visit('/cypress/fixtures/events/blur.html')
    cy.get('.vue-select').click()

    return new Cypress.Promise((resolve, reject) => {
      cy.document().then(document => {
        document.documentElement.removeEventListener('blur-custom-event', reject)
        document.documentElement.addEventListener('blur-custom-event', reject)
        cy.get('.vue-tags').children().first().click()
        resolve()
      })
    })
  })

  it('should fire blur event', () => {
    cy.visit('/cypress/fixtures/events/blur.html')
    cy.get('.vue-select').click()

    return new Cypress.Promise(resolve => {
      cy.document().then(document => {
        document.documentElement.removeEventListener('blur-custom-event', resolve)
        document.documentElement.addEventListener('blur-custom-event', resolve)
        cy.get('#another-focusable-element').focus()
      })
    })
  })

  it('should fire blur event after clicking arrow downward icon', () => {
    cy.visit('/cypress/fixtures/events/blur.html')
    cy.get('.vue-select').click()

    return new Cypress.Promise(resolve => {
      cy.document().then(document => {
        document.documentElement.removeEventListener('blur-custom-event', resolve)
        document.documentElement.addEventListener('blur-custom-event', resolve)
        cy.get('.icon.arrow-downward').click()
      })
    })
  })
})
