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

context('removed event', () => {
  it('should fire event after removing option', () => {
    setReject()
    cy.visit(path.join(__dirname, 'index.html')).then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('removed-custom-event', setResolve)
        window.addEventListener('removed-custom-event', setResolve)
      })
      cy.get('.vue-dropdown').children().first().click()
      cy.then(finish)
    })
  })

  it('should fire event after removing option by clicking tag', () => {
    setReject()
    cy.visit(path.join(__dirname, 'index.html')).then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('removed-custom-event', setResolve)
        window.addEventListener('removed-custom-event', setResolve)
      })
      cy.get('.vue-tags .icon').first().click()
      cy.then(finish)
    })
  })
})
