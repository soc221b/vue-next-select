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

context('open event', () => {
  it('should not fire open event after removing option', () => {
    setResolve()
    cy.visit('/cypress/fixtures/events/open.html').then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('open-custom-event', setReject)
        window.addEventListener('open-custom-event', setReject)
      })
      cy.get('.vue-dropdown').children().first().next().click()
      cy.then(finish)
    })
  })

  it('should not fire open event after adding option', () => {
    setResolve()
    cy.visit('/cypress/fixtures/events/open.html').then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('open-custom-event', setReject)
        window.addEventListener('open-custom-event', setReject)
      })
      cy.get('.vue-dropdown').children().first().next().click()
      cy.then(finish)
    })
  })

  it('should not fire open event after removing option by click tag', () => {
    setResolve()
    cy.visit('/cypress/fixtures/events/open.html').then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('open-custom-event', setReject)
        window.addEventListener('open-custom-event', setReject)
      })
      cy.get('.vue-tags').children().first().click()
      cy.then(finish)
    })
  })

  it('should fire open event', () => {
    setReject()
    cy.visit('/cypress/fixtures/events/open.html').then(window => {
      cy.then(() => {
        window.removeEventListener('open-custom-event', setResolve)
        window.addEventListener('open-custom-event', setResolve)
      })
      cy.get('.vue-select').click()
      cy.then(finish)
    })
  })

  it('should fire open event after clicking arrow downward icon', () => {
    setReject()
    cy.visit('/cypress/fixtures/events/open.html').then(window => {
      cy.then(() => {
        window.removeEventListener('open-custom-event', setResolve)
        window.addEventListener('open-custom-event', setResolve)
      })
      cy.get('.icon.arrow-downward').click()
      cy.then(finish)
    })
  })
})
