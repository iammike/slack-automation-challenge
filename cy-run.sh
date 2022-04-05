#!/bin/bash

# Using an older image to avoid https://github.com/cypress-io/cypress/issues/19299
docker run -it -v $PWD:/e2e -w /e2e cypress/included:8.5.0 $@
