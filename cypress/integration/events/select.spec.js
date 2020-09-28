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

context('select event', () => {
  it('should fire select event', () => {
    setReject()
    cy.visit('/cypress/fixtures/events/select.html').then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('select-custom-event', setResolve)
        window.addEventListener('select-custom-event', setResolve)
      })
      cy.get('.vue-dropdown').children().first().next().click()
      cy.then(finish)
    })
  })
})
