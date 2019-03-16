#!/usr/bin/env bash
set -eu

export PORT=9999

APP_PID=""
npm -s start &>/dev/null &

while [[ -z $(lsof -ti :${PORT}) ]]; do
  echo "Waiting for app to start..."
  sleep 1
done

APP_PID=$(lsof -ti :${PORT})
echo "App PID: ${APP_PID}"
echo "Running tests..."

TEST_PORT=${PORT} npm -s test

echo "Stopping app..."
kill $APP_PID
