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

context('search-input event', () => {
  it('should fire search-input event after type something', () => {
    setReject()
    cy.visit('/cypress/fixtures/events/search-input.html').then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('search-input-custom-event', setResolve)
        window.addEventListener('search-input-custom-event', setResolve)
      })
      cy.get('.vue-input').type('i')
      cy.then(finish)
    })
  })
})
