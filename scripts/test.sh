#!/usr/bin/env bash
set -eu

export PORT=9999
export REACT_APP_PRICE_OVERRIDE=${REACT_APP_PRICE_OVERRIDE:-}

echo "Building app..."
npm run build &>/dev/null

APP_PID=""
npm start &>/dev/null &

while [[ -z $(lsof -ti :${PORT}) ]]; do
  echo "Waiting for app to start..."
  sleep 1
done

APP_PID=$(lsof -ti :${PORT})
echo "App PID: ${APP_PID}"
echo "Running tests..."

set +e
TEST_PORT=${PORT} npm -s test
set -e

echo "Stopping app..."
kill $APP_PID
