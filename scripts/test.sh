#!/usr/bin/env bash
set -eu

echo -n "Running unit tests..."
npm run unit &>/dev/null
echo "done"

export PORT=9999

scripts/build.sh &>/dev/null

APP_PID=""
npm start &>/dev/null &

echo -n "Waiting for app to start..."
while [[ -z $(lsof -ti :${PORT}) ]]; do
  sleep 1
  echo -n "."
done
echo "done"

APP_PID=$(lsof -ti :${PORT})
echo "- App PID: ${APP_PID}"
echo "Running tests..."

set +e
TEST_PORT=${PORT} npm --silent test
set -e

echo -n "Stopping app..."
kill $APP_PID
echo "done"
