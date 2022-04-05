/// <reference types="cypress" />

// Suite is designed to work with unique message contents. If messages are duplicated, all bets are off; would require a 
// signficant redesign. Also an obvious parallelization issue if we fire two of this same test off at the same millisecond.
const messageContents = Date.now()

describe('Slack Coding Exercise', () => {

  beforeEach(() => {
    cy.loginWithToken()
    // cy.loginManually() // Leaving this handy for reviewers just in case something happens with the token
  })

  // As you can see, I'm a huge fan of abstracting away from my actual tests. With Cypress you do run the risk of overloading
  // the cy object, but I'm not going to overengineer a solution when this works perfectly well for this exercise and other
  // relatively small frameworks.
  it('Can create, star, and search for a message', () => {
    cy.submitMessage(messageContents)
    cy.saveMessageContaining(messageContents)
    cy.clickSavedItems()
    cy.assertMessageExists(messageContents)
    cy.waitForSearchToIndex(messageContents)
    cy.searchFor('has:star')
    cy.assertMessageExists(messageContents)
  })
})
