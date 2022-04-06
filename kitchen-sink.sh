#!/bin/bash

usage() {
    echo "usage: $0 [-i|--install] [-r|--run] [-l|--log] [*]"
    echo "  -i or --install      install prerequisites"
    echo "  -r or --run          run test suite in docker"
    echo "  -l or --log          open html test report"
    echo "  *                    any remaining options to be passed to the cypress executable"
    exit 0
}

if [ "$#" -eq 0 ]; then
    echo "WARNING: At least one argument must be provided"
    usage
fi

# Basis of this script found at https://stackoverflow.com/a/14203146/2533443

POSITIONAL_ARGS=()

while [[ $# -gt 0 ]]; do
    case $1 in
      -h|--help)
        HELP=true
        shift
        ;;
      -i|--install)
        INSTALL=true
        shift
        ;;
      -r|--run)
        RUN=true
        shift
        ;;
      -l|--log)
        OPENLOGS=true
        shift
        ;;
      *)
        POSITIONAL_ARGS+=("$1")
        shift
        ;;
    esac
done
set -- "${POSITIONAL_ARGS[@]}"

unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)     OS=linux;;
    Darwin*)    OS=mac;;
esac

if [ "$HELP" = true ]; then
    usage
fi

if [ "$INSTALL" = true ]; then
    if [ "$OS" = mac ]; then
        ./scripts/install-mac.sh
    elif [ "$OS" = linux ]; then
        ./scripts/install-linux.sh
    else
        echo "ERROR: Unknown operating system, please manually run correct install script from ./scripts"
        exit 0
    fi
fi

if [ "$RUN" = true ]; then
    ./scripts/runner.sh $@
fi

if [ "$OPENLOGS" = true ]; then
    open mochawesome-report/mochawesome.html
fi