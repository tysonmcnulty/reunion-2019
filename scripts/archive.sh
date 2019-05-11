#!/usr/bin/env bash
mkdir -p package
zip -r package/archive.zip \
  package.json \
  package-lock.json \
  index.js \
  app/src \
  node_modules \
  ui-web/build