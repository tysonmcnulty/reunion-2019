#!/usr/bin/env bash

echo -n "Building app (environment: ${REUNION_APP_ENV})..."
npm --prefix ui-web run build &>/dev/null
echo "done"
