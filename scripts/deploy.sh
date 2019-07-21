#!/usr/bin/env bash

set -e

DEPLOYMENT_ENV=${1:-prod}
REUNION_APP_ENV=${REUNION_APP_ENV:-unknown}

function check_environment() {
  if [ $REUNION_APP_ENV != $DEPLOYMENT_ENV ]; then
    echo "${DEPLOYMENT_ENV} deployment requested, but REUNION_APP_ENV is ${REUNION_APP_ENV}. Aborting deployment."
    echo "Check your credentials (in .envrc)."
    exit 1
  fi
}

case $DEPLOYMENT_ENV in
  test)
    check_environment
    export CF_MANIFEST="./manifest-test.yml"
    ;;
  prod)
    check_environment
    export CF_MANIFEST="./manifest.yml"
    ;;
  *)
    echo "🐝 Usage: scripts/deploy.sh [test|prod]"
    exit 1
    ;;
esac

cf push -p package/archive.zip -f $CF_MANIFEST
