#!/bin/bash

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
        OS=$2
        shift
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

if [ "$HELP" = true ]; then
    echo "usage: $0 [-i|--install operating_system] [-r|--run] [-l|--log] [*]"
    echo "  -i or --install os     install prerequisites for specified operating system ('mac' or 'linux', case sensitive)"
    echo "  -r or --run            run test suite in docker"
    echo "  -l or --log            open HTML log following test execution"
    echo "  *                      any remaining options to be passed to the cypress executable"
    exit 0
fi

if [ "$INSTALL" = true ]; then
    if [ "$OS" = mac ]; then
        ./install-mac.sh
    elif [ "$OS" = linux ]; then
        ./install-linux.sh
    else
        echo "USAGE ERROR: Operating system must be 'mac' or 'linux' (case sensitive)"
        exit 0
    fi
fi

if [ "$RUN" = true ]; then
    echo $@
    if [ "$OPENLOGS" = true ]; then
        ./cy-run-and-open-results.sh $@
    else
        ./cy-run.sh $@
    fi
fi