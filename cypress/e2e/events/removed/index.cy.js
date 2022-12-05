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
      cy.get('.vue-tags').children().first().click()
      cy.then(finish)
    })
  })

  it('should not fire event when there is no selected option', () => {
    setResolve()
    cy.visit(path.join(__dirname, 'single.html')).then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('removed-custom-event', setReject)
        window.addEventListener('removed-custom-event', setReject)
      })
      cy.get('.vue-dropdown').children().first().next().click()
      cy.then(finish)
    })
  })
})
