#!/bin/bash

if (! docker stats --no-stream  &> /dev/null); then
  open /Applications/Docker.app
while (! docker stats --no-stream  &> /dev/null ); do
  echo "Waiting for Docker to launch..."
  sleep 1
done
fi

# Using an older image to avoid https://github.com/cypress-io/cypress/issues/19299
docker run -it -v $PWD:/e2e -w /e2e cypress/included:8.5.0 $@
