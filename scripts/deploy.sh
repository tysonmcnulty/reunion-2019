#!/usr/bin/env bash

set -eu

export DEPLOYMENT_ENV=${1:-${REUNION_APP_ENV}}

scripts/env.sh check

case $DEPLOYMENT_ENV in
  test)
    export CF_MANIFEST="./manifest-test.yml"
    ;;
  prod)
    export CF_MANIFEST="./manifest.yml"
    ;;
  *)
    echo "Usage: scripts/deploy.sh [test|prod]"
    exit 1
    ;;
esac

cf zero-downtime-push \
  -f cf/manifest_${DEPLOYMENT_ENV}.yml \
  -p package/archive.zip
