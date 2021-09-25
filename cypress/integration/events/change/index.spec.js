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

context('change event', () => {
  context('single', () => {
    it('should fire event after removing option', () => {
      setReject()
      cy.visit(path.join(__dirname, 'single.html')).then(window => {
        cy.get('.vue-select').click()
        cy.then(() => {
          window.removeEventListener('change-custom-event', setResolve)
          window.addEventListener('change-custom-event', setResolve)
        })
        cy.get('.vue-dropdown').children().first().click()
        cy.then(finish)
      })
    })

    it('should fire event after selecting option', () => {
      setReject()
      cy.visit(path.join(__dirname, 'single.html')).then(window => {
        cy.get('.vue-select').click()
        cy.then(() => {
          window.removeEventListener('change-custom-event', setResolve)
          window.addEventListener('change-custom-event', setResolve)
        })
        cy.get('.vue-dropdown').children().first().next().click()
        cy.then(finish)
      })
    })
  })

  context('multiple', () => {
    it('should fire event after removing option', () => {
      setReject()
      cy.visit(path.join(__dirname, 'multiple.html')).then(window => {
        cy.get('.vue-select').click()
        cy.then(() => {
          window.removeEventListener('change-custom-event', setResolve)
          window.addEventListener('change-custom-event', setResolve)
        })
        cy.get('.vue-dropdown').children().first().click()
        cy.then(finish)
      })
    })

    it('should fire event after selecting option', () => {
      setReject()
      cy.visit(path.join(__dirname, 'multiple.html')).then(window => {
        cy.get('.vue-select').click()
        cy.then(() => {
          window.removeEventListener('change-custom-event', setResolve)
          window.addEventListener('change-custom-event', setResolve)
        })
        cy.get('.vue-dropdown').children().first().next().click()
        cy.then(finish)
      })
    })
  })

  context('taggable', () => {
    it('should fire event after removing option by clicking tag', () => {
      setReject()
      cy.visit(path.join(__dirname, 'taggable.html')).then(window => {
        cy.get('.vue-select').click()
        cy.then(() => {
          window.removeEventListener('change-custom-event', setResolve)
          window.addEventListener('change-custom-event', setResolve)
        })
        cy.get('.vue-tags').children().first().click()
        cy.then(finish)
      })
    })
  })
})
