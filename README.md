# MJC's Slack Take Home Exercise - Automation Engineer
This project satifies the requirements of the of the Slack Coding Exercise. Terminology used assumes a non-Windows operating system (Mac, specifically), but all intructions should loosely apply to any configuration.

## Notes
I have used extensive commenting in the source files. I typically do not comment this much or check in code not being used, but wanted to show as much of my thought process and work as possible.

## Part One - Browser Automation
[Cypress](https://www.cypress.io) was the chosen framework for validating the creation of a new message in Slack, saving it, verifying its existence in the **Saved items** list, searching for all saved items, and verifying its existence in those search results.

### Prerequisites
In order to successfully run this test suite, the following conditions must be met:

1. Project must be extracted or cloned locally, and user must be in project directory.
2. Node.js must be installed. See [How to install Node.js](https://nodejs.dev/learn/how-to-install-nodejs).
3. Cypress must be installed. As this is a project dependency, attempting to run the suite will prompt you to install (no action necessary at this time). If this automated process fails, `npm install cypress` or [the official installation](https://docs.cypress.io/guides/getting-started/installing-cypress) guide can be used.

### Execution
This test suite can be run from the command line or from the Cypress.app with a variety of options for each.

#### Command Line
The following commands can be used to execute the suite:

- `npx cypress run` will run the [default browser](https://docs.cypress.io/guides/guides/launching-browsers#Electron-Browser) in [headless mode](https://en.wikipedia.org/wiki/Headless_browser)
- `npx cypress run --headed` will run the default browser in headed mode
- `npx cypress run --browser chrome` will run the Chrome browser in headless mode

See [the official `cypress run` documentation](https://docs.cypress.io/guides/guides/command-line#cypress-run) for more information.

#### Cypress.app
The `npx cypress open` command will open the Cypress application as below:
![Screenshot of Cypress.app](https://www.iammike.org/wp-content/uploads/2022/04/Screen-Shot-2022-04-05-at-11.06.51-AM.png)

## Part Two - Execution Script
[Docker](https://www.docker.com) was selected as the container of choice as it is ubiquitous, and there is already a Cypress image available.

A variety of installation and runner scripts have been made available, but it is intended `./kitchen-sink.sh` be used as an all-in-one solution.

### Prerequisites
1. Project must be extracted or cloned locally, and user must be in project directory.

### Installation
A number of installation methods have been provided given the modular script setup used. Due to "resource" constraints (an eight day old daughter) only the Mac version is tested. If using Windows, [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install) must be installed and configured to run Ubuntu, and then the Linux installer and runner can *theoretically* be used.

#### Install Only
Will install all prerequisites.

- `./scripts/install-mac.sh` will install on Mac
- `./scripts/install-linux.sh` will install on Linux

#### Via "Kitchen Sink"
- `./kitchen-sink -i` will detect and install for your given operating system (Mac or Linux)

Should installation fail, the following steps can be followed for manual installation:

1. Install Node.js. See [How to install Node.js](https://nodejs.dev/learn/how-to-install-nodejs).
2. Install Node Modules by running `npm install`.
3. [Install Docker](https://docs.docker.com/engine/install/) and run it.

### Execution

#### Run Only
`./scripts/runner.sh` supports [all Cypress options](https://docs.cypress.io/guides/guides/command-line#cypress-run) such as `--headed` and `--browser`, amongst others, and will attempt to launch Docker (if not already running) on your operating system of choice (Mac or Linux).

#### Via "Kitchen Sink"
`./kitchen-sink -r` runs the above command, supports the same Cypress options, and also attempts to start Docker when necessary.

### Results
Results are output using [Mochawesome](https://www.npmjs.com/package/mochawesome), and stored in the `mochawesome-report` directory.

This tool was chosen because it is built on [Mocha](https://mochajs.org), can therefore integrate easily with Cypress (also built on Mocha), and it produces both human-readable `.html` reports and `.json` files for further integrations. 

These results can be opened with `open mochawesome-report/mochawesome.html` or `./kitchen-sink -l`

![Screenshot of result output](https://www.iammike.org/wp-content/uploads/2022/04/Screen-Shot-2022-04-05-at-2.37.41-PM.png)

### The Kitchen Sink
This script is the crux of this exercise. It is able to install prerequisites based on your detected operating system, run the test suite, and open the results in one fell swoop. Running the script with a `-h` or `--help` argument provides the following usage documentation:

```
usage: ./kitchen-sink.sh [-h|--help] [-i|--install] [-r|--run] [-l|--log] [*]
  -h or --help         prints this documentation and halts further execution
  -i or --install      install prerequisites
  -r or --run          run test suite in docker
  -l or --log          open html test report
  *                    any remaining options to be passed to the cypress executable
```
