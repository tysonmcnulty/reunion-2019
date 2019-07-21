#!/usr/bin/env bash

set -eu

export DEPLOYMENT_ENV=${1:-prod}
export REUNION_APP_ENV=${REUNION_APP_ENV:-unknown}

scripts/env.sh check
scripts/test.sh
scripts/archive.sh
scripts/deploy.sh $@
