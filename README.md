# slack-automation-challenge

This project satifies the requirements of the 1st part of the Slack Coding Exercise.

## Prerequisites

In order to successfully run this test suite, the following conditions must be met:

1. Node.js must be installed. See [How to install Node.js](https://nodejs.dev/learn/how-to-install-nodejs) from the official site of the runtime.
2. Cypress must be installed. As this is a project dependency, attempting to run the suite will prompt you to install (no action necessary at this time). If this automated process fails, `npm install cypress` or [the official installation](https://docs.cypress.io/guides/getting-started/installing-cypress) guide can be used.
3. User has a Terminal window open to this project's directory.

## Execution

This test suite can be run from the command line or from the Cypress.app with a variety of options for each.

### Command Line

The following commands can be used to execute the suite:

- `npx cypress run` will run the [default browser](https://docs.cypress.io/guides/guides/launching-browsers#Electron-Browser) in [headless mode](https://en.wikipedia.org/wiki/Headless_browser)
- `npx cypress run --headed` will run the default browser in headed mode
- `npx cypress run --browser chrome` will run the Chrome browser in headless mode

See [the official `cypress run` documentation](https://docs.cypress.io/guides/guides/command-line#cypress-run) for more information.

### Cypress.app

The `npx cypress open` command will open the Cypress application as below:

![Screenshot of Cypress.app](https://www.iammike.org/wp-content/uploads/2022/04/Screen-Shot-2022-04-05-at-11.06.51-AM.png)
