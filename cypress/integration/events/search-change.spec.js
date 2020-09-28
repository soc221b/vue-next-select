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

context('search-change event', () => {
  it('should not fire search-change event after type something', () => {
    setResolve()
    cy.visit('/cypress/fixtures/events/search-change.html').then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('search-change-custom-event', setReject)
        window.addEventListener('search-change-custom-event', setReject)
      })
      cy.get('.vue-input').type('i')
      cy.then(finish)
    })
  })

  it('should not fire search-change event after direct blur', () => {
    setResolve()
    cy.visit('/cypress/fixtures/events/search-change.html').then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('search-change-custom-event', setReject)
        window.addEventListener('search-change-custom-event', setReject)
      })
      cy.get('#another-focusable-element').focus()
      cy.then(finish)
    })
  })

  it('should fire search-change event after type something and blur', () => {
    setReject()
    cy.visit('/cypress/fixtures/events/search-change.html').then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('search-change-custom-event', setResolve)
        window.addEventListener('search-change-custom-event', setResolve)
      })
      cy.get('.vue-input').type('i')
      cy.get('#another-focusable-element').focus()
      cy.then(finish)
    })
  })
})
