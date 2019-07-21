#!/usr/bin/env bash

set -eu

function env_check() {
  echo "Requested deployment environment: '${DEPLOYMENT_ENV}'"
  echo "Application built for environment: '${REUNION_APP_ENV}'"

  if [ $REUNION_APP_ENV != $DEPLOYMENT_ENV ]; then
    echo "Environment mismatch! To fix, change your credentials (in .envrc)."
    exit 1
  fi
}

function env_set() {
  local ENVRC_FILE="environments/${1}.envrc"
  if [ ! -f ${ENVRC_FILE} ]; then
    echo "Environment '${1}' not found."
    exit 1
  fi

  echo "Setting environment from '${ENVRC_FILE}'..."
  cp ${ENVRC_FILE} .envrc
  echo "export REUNION_APP_ENV=${1}" >> .envrc

  echo -n "Cleaning old build artifacts..."
  rm -rf ui-web/build
  echo "done"
}

case ${1:-} in
  check)
    env_check
    ;;
  set)
    shift
    env_set $@
    ;;
  *)
    echo "Usage: scripts/env.sh [check|set]"
    exit 1
    ;;
esac
