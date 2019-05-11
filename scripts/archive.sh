#!/usr/bin/env bash
mkdir -p package
zip -r package/archive.zip \
  package.json \
  package-lock.json \
  index.js \
  app/src \
  .env \
  ui-web/build