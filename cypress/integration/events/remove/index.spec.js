/// <reference types="cypress" />
import path from 'path'

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

context('remove event', () => {
  it('should fire remove event after removing option', () => {
    setReject()
    cy.visit(path.join(__dirname, 'index.html')).then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('remove-custom-event', setResolve)
        window.addEventListener('remove-custom-event', setResolve)
      })
      cy.get('.vue-dropdown').children().first().click()
      cy.then(finish)
    })
  })

  it('should fire remove event after removing option by clicking tag', () => {
    setReject()
    cy.visit(path.join(__dirname, 'index.html')).then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('remove-custom-event', setResolve)
        window.addEventListener('remove-custom-event', setResolve)
      })
      cy.get('.vue-tags').children().first().click()
      cy.then(finish)
    })
  })
})
