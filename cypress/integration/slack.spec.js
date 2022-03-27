// slack.spec.js created with Cypress
//

describe('Slack web app', () => {

  let timestamp = Date.now()
  let workspace = 'mike-cypress-test'
  let username = 'iammikec@gmail.com'
  let password = 'rrI$agc82sk'
  let token = 'xoxp-3320964362576-3297204678322-3322654353552-9be79074aba61b1dc1373fca7cda33ae'
  let shortTimeout = 1000
  let mediumTimeout = 5000
  let longTimeout = 15000

  beforeEach(() => {
    cy.visit('https://app.slack.com')

    // Hamburger menu exists on smaller screens
    if (Cypress.config().viewportWidth > 1084) {
      cy.get('[data-qa=link_sign_in_nav]')
        .click()
    } else {
      cy.get('#nav_menu_btn').click()
      cy.get('#main_nav')
        .contains('Sign in')
        .click()
    }

    cy.get('div.p-get_started_signin__manual > span > a')
      .click()

    cy.get('[data-qa=signin_domain_input]')
      .type(workspace + '{enter}')

    cy.get('[data-qa=login_email]')
      .type(username)

    cy.get('[data-qa=login_password]')
      .type(password + '{enter}')

    // On first run you will see this
    // cy.get('[data-qa=continue_in_browser]')
    //   .click()

    cy.intercept('POST', '*promo.campaigns.eligibilityInfo*').as('receivePromos')
    cy.wait('@receivePromos', { requestTimeout: 15000 })

    cy.intercept('POST', '*conversations.genericInfo*').as('receiveConvos')
    cy.wait('@receiveConvos', { requestTimeout: 15000 })
  })

  it('can create a message, star it, and search for it by starred', () => {

    //// can create a message
    cy.get('[data-qa=message_input]')
      .type(timestamp + '{enter}')

    cy.wait(5000)

    //// can star it
    // hover over last message
    cy.get('.p-message_pane_message__message--last')
    // cy.get('[data-qa-hover=true]').last()
      .trigger('mouseover')

    // add to saved items
    cy.get('[data-qa=save_message]')
      .click()

    //// can view in saved items
    // click saved items
    cy.get('#Psaved')
      .click()
    // assert message is found
    cy.get('[data-qa=message-text]')
      .contains(timestamp)
      .should('have.length', 1)

    // messages don't show up in results immediately
    // can i make an API call to verify it will? while loop until it's the right value?

    cy.wait(30000)

    //// can search for starred
    // click search bar
    cy.get('[data-qa=top_nav_search]')
      .click()
    // enter text
    cy.get('[data-qa=focusable_search_input]')
      .type('has:star{enter}')
    // assert message is found
    cy.intercept('POST', '*search.modules*').as('searchRendered')
    cy.wait('@searchRendered', { requestTimeout: 15000 })
    cy.get('[data-qa=message-text]')
      .contains(timestamp)
      .should('have.length', 1)

    // can i find message IDs to really nail the message?
  })
})
