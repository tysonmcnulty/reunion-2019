#!/usr/bin/env bash

set -eu

scripts/test.sh
scripts/archive.sh
scripts/deploy.sh $@
