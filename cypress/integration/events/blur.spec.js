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

context('blur event', () => {
  it('should not fire blur event after adding option', () => {
    setResolve()
    cy.visit('/cypress/fixtures/events/blur.html').then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('blur-custom-event', setReject)
        window.addEventListener('blur-custom-event', setReject)
      })
      cy.wait(50).get('.vue-dropdown').children().first().next().click()
      cy.then(finish)
    })
  })

  it('should not fire blur event after removing option', () => {
    setResolve()
    cy.visit('/cypress/fixtures/events/blur.html').then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('blur-custom-event', setReject)
        window.addEventListener('blur-custom-event', setReject)
      })
      cy.wait(50).get('.vue-dropdown').children().first().click()
      cy.then(finish)
    })
  })

  it('should not fire blur event after removing option by clicking tag', () => {
    setResolve()
    cy.visit('/cypress/fixtures/events/blur.html').then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('blur-custom-event', setReject)
        window.addEventListener('blur-custom-event', setReject)
      })
      cy.get('.vue-tags').children().first().click()
      cy.then(finish)
    })
  })

  it('should fire blur event', () => {
    setReject()
    cy.visit('/cypress/fixtures/events/blur.html').then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('blur-custom-event', setResolve)
        window.addEventListener('blur-custom-event', setResolve)
      })
      cy.get('#another-clickable-element').click()
      cy.then(finish)
    })
  })

  it('should fire blur event after clicking arrow downward icon', () => {
    setReject()
    cy.visit('/cypress/fixtures/events/blur.html').then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('blur-custom-event', setResolve)
        window.addEventListener('blur-custom-event', setResolve)
      })
      cy.get('.icon.arrow-downward').click()
      cy.then(finish)
    })
  })
})
