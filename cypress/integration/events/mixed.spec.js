/// <reference types="cypress" />

let shouldReject = null
const setReject = () => {
  if (shouldReject !== null) return
  shouldReject = true
}
const setResolve = () => {
  if (shouldReject !== null) return
  shouldReject = false
}
const finish = () => {
  if (shouldReject) throw Error()
}

context('mixed event (single)', () => {
  beforeEach(() => {
    shouldReject = null
  })

  it('should fire open event first', () => {
    cy.visit('/cypress/fixtures/events/mixed/single.html').then(window => {
      cy.then(() => {
        window.removeEventListener('open-custom-event', setResolve)
        window.addEventListener('open-custom-event', setResolve)
      })
      cy.then(() => {
        window.removeEventListener('focus-custom-event', setReject)
        window.addEventListener('focus-custom-event', setReject)
      })
      cy.get('.vue-select').click()
      cy.then(finish)
    })
  })

  it('should fire open event first after clicking arrow downward icon', () => {
    cy.visit('/cypress/fixtures/events/mixed/single.html').then(window => {
      cy.then(() => {
        window.removeEventListener('open-custom-event', setResolve)
        window.addEventListener('open-custom-event', setResolve)
      })
      cy.then(() => {
        window.removeEventListener('focus-custom-event', setReject)
        window.addEventListener('focus-custom-event', setReject)
      })
      cy.get('.icon.arrow-downward').click()
      cy.then(finish)
    })
  })

  it('should fire blur event first', () => {
    cy.visit('/cypress/fixtures/events/mixed/single.html').then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('blur-custom-event', setResolve)
        window.addEventListener('blur-custom-event', setResolve)
      })
      cy.then(() => {
        window.removeEventListener('close-custom-event', setReject)
        window.addEventListener('close-custom-event', setReject)
      })
      cy.get('#another-clickable-element').click()
      cy.then(finish)
    })
  })

  it('should fire blur event first after clicking arrow downward icon', () => {
    cy.visit('/cypress/fixtures/events/mixed/single.html').then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('blur-custom-event', setResolve)
        window.addEventListener('blur-custom-event', setResolve)
      })
      cy.then(() => {
        window.removeEventListener('close-custom-event', setReject)
        window.addEventListener('close-custom-event', setReject)
      })
      cy.get('.icon.arrow-downward').click()
      cy.then(finish)
    })
  })
})

context('mixed event (multiple)', () => {
  beforeEach(() => {
    shouldReject = null
  })

  it('should fire open event first', () => {
    cy.visit('/cypress/fixtures/events/mixed/multiple.html').then(window => {
      cy.then(() => {
        window.removeEventListener('open-custom-event', setResolve)
        window.addEventListener('open-custom-event', setResolve)
      })
      cy.then(() => {
        window.removeEventListener('focus-custom-event', setReject)
        window.addEventListener('focus-custom-event', setReject)
      })
      cy.get('.vue-select').click()
      cy.then(finish)
    })
  })

  it('should fire open event first after clicking arrow downward icon', () => {
    cy.visit('/cypress/fixtures/events/mixed/multiple.html').then(window => {
      cy.then(() => {
        window.removeEventListener('open-custom-event', setResolve)
        window.addEventListener('open-custom-event', setResolve)
      })
      cy.then(() => {
        window.removeEventListener('focus-custom-event', setReject)
        window.addEventListener('focus-custom-event', setReject)
      })
      cy.get('.icon.arrow-downward').click()
      cy.then(finish)
    })
  })

  it('should fire blur event first', () => {
    cy.visit('/cypress/fixtures/events/mixed/multiple.html').then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('blur-custom-event', setResolve)
        window.addEventListener('blur-custom-event', setResolve)
      })
      cy.then(() => {
        window.removeEventListener('close-custom-event', setReject)
        window.addEventListener('close-custom-event', setReject)
      })
      cy.get('#another-clickable-element').click()
      cy.then(finish)
    })
  })

  it('should fire blur event first after clicking arrow downward icon', () => {
    cy.visit('/cypress/fixtures/events/mixed/multiple.html').then(window => {
      cy.get('.vue-select').click()
      cy.then(() => {
        window.removeEventListener('blur-custom-event', setResolve)
        window.addEventListener('blur-custom-event', setResolve)
      })
      cy.then(() => {
        window.removeEventListener('close-custom-event', setReject)
        window.addEventListener('close-custom-event', setReject)
      })
      cy.get('.icon.arrow-downward').click()
      cy.then(finish)
    })
  })
})
