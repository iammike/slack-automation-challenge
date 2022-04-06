/// <reference types="cypress" />

// My background is heavy in Page Object Model so selector reusability is something I struggle with in Cypress. I was very
// tempted to create some constants to store and reuse them, but didn't want to buck the stance of JUST SAY NO TO PAGE OBJECTS
// espoused by the framework's maintainers. While I've not done this here, I do feel they are warranted in certain 
// circumstances.

Cypress.Commands.add('assertMessageExists', (text) => {
  cy.get('[data-qa=message-text]')
    .contains(text)
    .should('exist')
})

Cypress.Commands.add('clickSavedItems', () => {
  cy.get('#Psaved')
    .click()
})

// Did not end up using this and am a strong advocate of not including unused code, but showing thought process/things tried
// for the purpose of this exercise. Not using this because it may not provide the message I'm looking for.
Cypress.Commands.add('hoverOverLastMessage', () => {
  cy.get('.p-message_pane_message__message--last')
    .trigger('mouseover')
})

Cypress.Commands.add('hoverOverText', (text) => {
  cy.contains(text)
    .trigger('mouseover')
})

// Leaving this here to show development process I followed - got the very basics working at first, and then optimized. Of 
// note, if we start at http://app.slack.com we need to account for the viewport size; at less than 1085 pixels the menu is 
// collapsed so there are additional clicks to find the sign in button to bring us to /client.
Cypress.Commands.add('loginManually', () => {
  cy.visit('/')
  cy.get('[data-qa=signin_domain_input]')
    .type(Cypress.env('workspaceName'))
    .type('{enter}')
  cy.get('[data-qa=login_email]')
    .type(Cypress.env('username'))
  cy.get('[data-qa=login_password]')
    .type(Cypress.env('password'))
    .type('{enter}')

  // QUESTION: When does "continue in browser" page fire? I've seen it, but since I'm no longer using this method to sign in I
  // don't particularly care. **Caution!**

  // Wait for things to load so we do not risk timing out following command
  cy.intercept('POST', '*conversations.genericInfo*').as('receiveConvos')
  cy.wait('@receiveConvos', { requestTimeout: 30000 })
})

// Token does need to be refreshed every year so ultimately a solution such as Auth0 might be preferrable
Cypress.Commands.add('loginWithToken', () => {
  cy.setCookie('d', Cypress.env('userToken'))
  cy.visit(Cypress.env('workspacePath'))

  // Wait for things to load so we do not risk timing out following command
  cy.intercept('POST', '*conversations.genericInfo*').as('receiveConvos')
  cy.wait('@receiveConvos', { requestTimeout: 30000 })
})

Cypress.Commands.add('saveMessageContaining', (text) => {
  cy.hoverOverText(text)
  cy.get('[data-qa=save_message]')
    .click()
})

// I found clicking the search bar to be oddly finicky, but it seemed to only occur when changing code and replaying 
// without quitting the Test Runner. On initial run and replays without code changes, all is well so I'm going to chalk this up 
// to framework caching or a bug. I opened a StackOverflow question (https://stackoverflow.com/q/71744923/2533443) and the only
// response was to try a third-party tool. Worth investigation if this proves to be more of an issue than I think it is.
Cypress.Commands.add('searchFor', (searchTerm) => {
  cy.get('[data-qa=top_nav_search]')
    .click()
  cy.get('[data-qa=focusable_search_input]')
    .type(searchTerm)
    .type('{enter}')

  // Wait for results to render - we're fine without this, but don't want to risk performing actions on previous pages
  cy.get('[data-qa=search_message_group]')
})

Cypress.Commands.add('submitMessage', (text) => {
  cy.get('[data-qa=message_input]')
    .type(text)
    .type('{enter}')

  // I repeatedly received DOM detached errors here that I could only reliably resolve with a wait or via the addition of a
  // third-party library that adds native events (https://github.com/dmtrKovalenko/cypress-real-events). To me, a third party
  // library is barely a step above an explicit wait because they may lose support, or may do things oddly, which was the 
  // case here; I was seeing phantom hovers on my search results, and that didn't sit well. Given this is an exceptionally
  // short wait (edit: it was reliably 100ms, but just as I was about to submit this project it became unreliable), I opted
  // for using it rather than introducing complexity.
  //
  // This appears to be a major issue for Cypress https://github.com/cypress-io/cypress/issues/7306. I tried many of the
  // solutions here with mixed, but generally poor results.
  cy.wait(500)
})

// Waits for the search API to confirm a given text will return results
Cypress.Commands.add('waitForSearchToIndex', (text, retries = 0) => {
  if (retries > 60) return // Waited a ~minute? Break out and let the test continue to run and likely fail
  const authorization = `Bearer ${Cypress.env('apiToken')}`
  const options = {
    url: Cypress.env('apiBase') + '/search.messages',
    method: 'GET',
    headers: {
      authorization,
    },
    qs: {
      query: text,
    }
  }

  cy.request(options)
    .then((response) => {
      if (response.body['messages']['pagination']['total_count'] == 0) {
        retries++
        cy.wait(1000) // Throttling: Don't want to hammer the API
        cy.waitForSearchToIndex(text, retries)
      }
    })
})