/// <reference types="cypress" />

let shouldReject = false
const setReject = () => {
  shouldReject = true
}
const setResolve = () => {
  shouldReject = false
}
const finish = () => {
  if (shouldReject) throw Error()
}

context('close event', () => {
  it('should not fire close event', () => {
    setResolve()
    cy.visit('/cypress/fixtures/events/close.html').then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('close-custom-event', setReject)
        window.addEventListener('close-custom-event', setReject)
      })
      cy.get('.vue-select').click()
      cy.then(finish)
    })
  })

  it('should not fire close event after adding option', () => {
    setResolve()
    cy.visit('/cypress/fixtures/events/close.html').then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('close-custom-event', setReject)
        window.addEventListener('close-custom-event', setReject)
      })
      cy.get('.vue-dropdown').children().first().next().click()
      cy.then(finish)
    })
  })

  it('should not fire close event after removing option', () => {
    setResolve()
    cy.visit('/cypress/fixtures/events/close.html').then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('close-custom-event', setReject)
        window.addEventListener('close-custom-event', setReject)
      })
      cy.get('.vue-dropdown').children().first().click()
      cy.then(finish)
    })
  })

  it('should not fire close event after removing option by click tag', () => {
    setResolve()
    cy.visit('/cypress/fixtures/events/close.html').then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('close-custom-event', setReject)
        window.addEventListener('close-custom-event', setReject)
      })
      cy.get('.icon.delete').first().click()
      cy.then(finish)
    })
  })

  it('should fire close event', () => {
    setReject()
    cy.visit('/cypress/fixtures/events/close.html').then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('close-custom-event', setResolve)
        window.addEventListener('close-custom-event', setResolve)
      })
      cy.get('#another-clickable-element').click()
      cy.then(finish)
    })
  })

  it('should fire close event after clicking arrow downward icon', () => {
    setReject()
    cy.visit('/cypress/fixtures/events/close.html').then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('close-custom-event', setResolve)
        window.addEventListener('close-custom-event', setResolve)
      })
      cy.get('.icon.arrow-downward').click()
      cy.then(finish)
    })
  })
})
