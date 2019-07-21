#!/usr/bin/env bash

set -eu

export DEPLOYMENT_ENV=${1:-prod}
export REUNION_APP_ENV=${REUNION_APP_ENV:-unknown}

scripts/env.sh check

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
    echo "Usage: scripts/deploy.sh [test|prod]"
    exit 1
    ;;
esac

echo "force fail"
exit 1

cf push -p package/archive.zip -f $CF_MANIFEST
